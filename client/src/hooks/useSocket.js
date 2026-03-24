import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import useAuthStore from '../store/authStore';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const useSocket = (namespace = '/') => {
  const socketRef = useRef(null);
  const { token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const options = {
      auth: namespace === '/admin' ? { token } : {},
    };

    const socket = io(`${SOCKET_URL}${namespace}`, options);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log(`Connected to socket namespace: ${namespace}`);
    });

    socket.on('connect_error', (err) => {
      console.error(`Socket connection error: ${err.message}`);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, [namespace, token, isAuthenticated]);

  return socketRef.current;
};

export default useSocket;
