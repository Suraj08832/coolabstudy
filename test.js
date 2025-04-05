const io = require('socket.io-client');
const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testFeatures() {
    try {
        console.log('Testing authentication...');
        
        // Test signup
        const signupResponse = await axios.post(`${BASE_URL}/api/auth/signup`, {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });
        
        console.log('Signup response:', signupResponse.data);
        
        // Test login
        const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
            email: 'test@example.com',
            password: 'password123'
        });
        
        console.log('Login response:', loginResponse.data);
        
        // Test socket connection
        console.log('\nTesting socket connection...');
        const socket = io(BASE_URL);
        
        socket.on('connect', () => {
            console.log('Socket connected');
            
            // Authenticate socket
            socket.emit('authenticate', loginResponse.data.token);
            
            // Test whiteboard drawing
            console.log('\nTesting whiteboard...');
            socket.emit('draw', {
                x1: 0,
                y1: 0,
                x2: 100,
                y2: 100,
                color: '#000',
                width: 2
            });
            
            // Test music sync
            console.log('\nTesting music sync...');
            socket.emit('playMusic', {
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            });
            
            setTimeout(() => {
                socket.emit('pauseMusic', {});
                console.log('\nAll tests completed successfully!');
                process.exit(0);
            }, 2000);
        });
        
        socket.on('error', (error) => {
            console.error('Socket error:', error);
            process.exit(1);
        });
        
    } catch (error) {
        console.error('Test failed:', error.response?.data || error.message);
        process.exit(1);
    }
}

testFeatures(); 