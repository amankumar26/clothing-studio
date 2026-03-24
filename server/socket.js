import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  // Admin namespace
  const adminNamespace = io.of('/admin');

  adminNamespace.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error - No token provided'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return next(new Error('Authentication error - Invalid token'));
      socket.admin = decoded;
      next();
    });
  });

  adminNamespace.on('connection', (socket) => {
    console.log('Admin connected to /admin');
    socket.join('admins');

    socket.on('disconnect', () => {
      console.log('Admin disconnected');
    });
  });

  io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

export const emitToAdmins = (event, data) => {
  if (io) {
    io.of('/admin').to('admins').emit(event, data);
  }
};

export const emitToPublic = (event, data) => {
  if (io) {
    io.emit(event, data);
  }
};
