import { type Message, MessageType } from '../types/message';

export const isValidMessageType = (messageType: MessageType): boolean =>
  Object.values(MessageType).includes(messageType);

export const getParsedMessage = (rawData: string): Message | null => {
  try {
    const message = JSON.parse(rawData) as Message;

    return isValidMessageType(message.type) ? message : null;
  } catch {
    return null;
  }
};

export const getStringifiedMessage = (message: Message): string =>
  JSON.stringify(message);
