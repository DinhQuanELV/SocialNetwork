import { io } from 'socket.io-client';

export const socket = io('http://localhost:5000', {
  transports: ['websocket'],
});

export const useSocket = () => {
  const emitEvent = (event, data, ...args) => {
    socket.emit(event, data, ...args);
  };

  const subscribeEvent = (event, eventHandler) => {
    socket.on(event, eventHandler);
  };

  const unSubscribeEvent = (event) => {
    socket.off(event);
  };
  return { socket, emitEvent, subscribeEvent, unSubscribeEvent };
};
