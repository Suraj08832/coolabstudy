const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const whiteboardRoutes = require('./routes/whiteboard');
const musicRoutes = require('./routes/music');

const app = express();
const server = http.createServer(app);

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Log all requests with more details
app.use((req, res, next) => {
  console.log('Request Details:');
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Headers:`, req.headers);
  console.log(`Body:`, req.body);
  console.log('-------------------');
  next();
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/whiteboard', authenticateToken, whiteboardRoutes);
app.use('/api/music', authenticateToken, musicRoutes);

// Handle root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO setup
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store connected users
const connectedUsers = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle authentication
  socket.on('authenticate', (token) => {
    try {
      const user = jwt.verify(token, 'your-secret-key');
      connectedUsers.set(socket.id, user);
      console.log(`User ${user.username} authenticated`);
    } catch (error) {
      console.error('Authentication failed:', error);
      socket.disconnect();
    }
  });

  // Handle drawing events
  socket.on('draw', (data) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      socket.broadcast.emit('draw', {
        ...data,
        user: user.username
      });
    }
  });

  // Handle music events
  socket.on('playMusic', (data) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      socket.broadcast.emit('playMusic', {
        ...data,
        user: user.username
      });
    }
  });

  socket.on('pauseMusic', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      socket.broadcast.emit('pauseMusic', {
        user: user.username
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    connectedUsers.delete(socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  console.log('404 - Route not found:', req.url);
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;

// Function to start server
function startServer() {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to access the application`);
    console.log(`Test endpoint: http://localhost:${PORT}/api/auth/test`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
      PORT = PORT + 1;
      startServer();
    } else {
      console.error('Server error:', err);
    }
  });
}

// Start the server
startServer(); 