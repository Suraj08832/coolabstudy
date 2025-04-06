# CollabStudy Frontend

A modern React-based frontend for the CollabStudy application.

## Features

- Real-time collaborative whiteboard
- Synchronized music playback
- User authentication
- Study group management

## Deployment

The frontend is deployed on Render and can be accessed at:
https://collabstudy-frontend.onrender.com

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/Suraj08832/coolabstudy.git
cd coolabstudy/collabstudy-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Environment Variables

Create a `.env` file in the `collabstudy-react` directory with:
```
REACT_APP_API_URL=https://collabstudy-backend.onrender.com
```

## Technologies Used

- React
- Material-UI
- Socket.IO Client
- Axios 