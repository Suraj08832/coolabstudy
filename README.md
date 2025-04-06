# CollabStudy - Collaborative Study Platform

A real-time collaborative study platform with whiteboard and synchronized music features.

## Features

- Real-time collaborative whiteboard
- Synchronized music playback
- User authentication
- Study group management

## Deployment

This project is configured for easy deployment on Render. Follow these steps:

1. Fork this repository
2. Create a Render account at https://render.com
3. Connect your GitHub repository to Render
4. Render will automatically detect the `render.yaml` file and set up both services:
   - Backend service (Node.js)
   - Frontend service (React)

The services will be available at:
- Backend: https://collabstudy-backend.onrender.com
- Frontend: https://collabstudy-frontend.onrender.com

## Local Development

### Backend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to React app directory
cd collabstudy-react

# Install dependencies
npm install

# Start development server
npm start
```

## Environment Variables

### Backend (.env)
```
PORT=3000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### Frontend (.env)
```
PORT=3001
REACT_APP_API_URL=http://localhost:3000
```

## Technologies Used

- Node.js
- Express
- Socket.IO
- React
- Material-UI
- Framer Motion 