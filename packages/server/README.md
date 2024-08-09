# @price-comparator/server

Plain WebSocket server for receiving price data

## Income Messages Types

### `SUBSCRIBE`

Using for subscribing to specific market channels

Example:

```json
{
  "type": "SUBSCRIBE",
  "data": {
    "marketIds": ["BTCUSD", "ETHUSD"]
  }
}
```

After that, the client receives `PRICE` messages with price data from all sources

### `UNSUBSCRIBE`

Using for unsubscribing from specific markets channels

Example:

```json
{
  "type": "UNSUBSCRIBE",
  "data": {
    "marketIds": ["ETHUSD"]
  }
}
```

After that, the client doesn't receive `PRICE` messages from `ETHUSD` channel but continues to receive messages from `BTCUSD` channel

## Outcome Messages Types

### `PRICE`

Server sends price data from specific `marketId` and specific `sourceId`

Example:

```json
{
  "type": "PRICE",
  "data": {
    "marketId": "ETHUSD",
    "sourceId": "REYA",
    "timestamp": 1723202692935,
    "price": 2345.325421
  }
}
```

## Enums

Located in `@price-comparator/common` package

### MarketId

Supported markets

```ts
enum MarketId {
  BTCUSD = 'BTCUSD',
  ETHUSD = 'ETHUSD',
  SOLUSD = 'SOLUSD',
  ARBUSD = 'ARBUSD',
  OPUSD = 'OPUSD',
  AVAXUSD = 'AVAXUSD',
}
```

### SourceId

Supported sources

```ts
export enum SourceId {
  REYA = 'REYA',
  VERTEX = 'VERTEX',
}
```

### Client Code Examples

```ts
const subscribeToMarket = useCallback((marketId: MarketId) => {
  if (wsRef.current) {
    const subscribeMessage: Message = {
      type: MessageType.SUBSCRIBE,
      data: { marketIds: [marketId] },
    };

    const stringifiedMessage = getStringifiedMessage(subscribeMessage);

    wsRef.current.send(stringifiedMessage);
  }
}, []);

const handleMessage = (message: Message) => {
  const { type, data } = message;

  if (type === MessageType.PRICE) {
    setLatestPriceMessageData(data);
  }
};

useEffect(() => {
  wsRef.current = new WebSocket('ws://localhost:8080');

  wsRef.current.onmessage = (event) => {
    const message = getParsedMessage(event.data);

    if (message) {
      handleMessage(message);
    }
  };

  return () => {
    wsRef.current?.close();
  };
}, []);
```
