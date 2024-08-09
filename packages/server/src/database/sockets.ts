import { type WebSocket } from 'ws';

const userToSocketMap = new Map<string, WebSocket>();

export const getSocketByUser = (userId: string): WebSocket | undefined => {
  return userToSocketMap.get(userId);
};

export const addSocketByUser = (userId: string, socket: WebSocket): void => {
  userToSocketMap.set(userId, socket);
};

export const deleteSocketByUser = (userId: string): void => {
  userToSocketMap.delete(userId);
};
