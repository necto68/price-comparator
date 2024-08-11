import crypto from 'node:crypto';
import { getParsedMessage } from '@price-comparator/common';
import { WebSocketServer } from 'ws';
import { processMessage } from './messages/index.js';
import { unsubscribeUserFromMarkets } from './database/markets.js';
import { addSocketByUser, deleteSocketByUser } from './database/sockets.js';
import { initPricesUpdater } from './prices/index.js';

const port = process.env.PORT ? Number(process.env.PORT) : 8080;

const server = new WebSocketServer({
  port,
});

server.on('connection', (socket) => {
  const userId = crypto.randomUUID();

  addSocketByUser(userId, socket);

  socket.on('message', (rawData) => {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string -- we need to convert Buffer to string
    const stringifiedRawData = rawData.toString();
    const message = getParsedMessage(stringifiedRawData);

    if (message) {
      processMessage(userId, message);
    }
  });

  socket.on('close', () => {
    unsubscribeUserFromMarkets(userId);
    deleteSocketByUser(userId);
  });
});

initPricesUpdater();

// eslint-disable-next-line no-console -- we need to log the port
console.log(`Server started on ${port.toString()}`);
