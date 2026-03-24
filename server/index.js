import 'dotenv/config';
import http from 'http';
import app from './app.js';
import connectDB from './config/db.js';
import { initSocket } from './socket.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Initialize HTTP server
const server = http.createServer(app);

// Initialize Socket.io
initSocket(server);

// Listen to port
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
