import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  getParsedMessage,
  getStringifiedMessage,
  MarketId,
  MessageType,
  type Message,
} from '@price-comparator/common';
import { AppState } from '../types/AppState';
import { serverUrl } from '../constants/serverUrl.ts';

export const AppStateContext = createContext<AppState>({
  subscribedMarkets: new Set(),
  subscribeToMarket: () => {},
  unsubscribeFromMarket: () => {},
  latestPriceMessageData: null,
});

export const AppStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const wsRef = useRef<WebSocket | null>(null);

  const [latestPriceMessageData, setLatestPriceMessageData] =
    useState<AppState['latestPriceMessageData']>(null);

  const [subscribedMarkets, setSubscribedMarkets] = useState<
    AppState['subscribedMarkets']
  >(new Set());

  const subscribeToMarket = useCallback((marketId: MarketId) => {
    if (wsRef.current) {
      const subscribeMessage: Message = {
        type: MessageType.SUBSCRIBE,
        data: { marketIds: [marketId] },
      };

      const stringifiedMessage = getStringifiedMessage(subscribeMessage);

      wsRef.current.send(stringifiedMessage);

      setSubscribedMarkets((prev) => new Set([...prev, marketId]));
    }
  }, []);

  const unsubscribeFromMarket = useCallback((marketId: MarketId) => {
    if (wsRef.current) {
      const unsubscribeMessage: Message = {
        type: MessageType.UNSUBSCRIBE,
        data: { marketIds: [marketId] },
      };

      const stringifiedMessage = getStringifiedMessage(unsubscribeMessage);

      wsRef.current.send(stringifiedMessage);

      setSubscribedMarkets((prev) => {
        const next = new Set(prev);
        next.delete(marketId);
        return next;
      });
    }
  }, []);

  const handleMessage = (message: Message) => {
    const { type, data } = message;

    if (type === MessageType.PRICE) {
      setLatestPriceMessageData(data);
    }
  };

  useEffect(() => {
    wsRef.current = new WebSocket(serverUrl);

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

  const value = useMemo(
    () => ({
      subscribedMarkets,
      subscribeToMarket,
      unsubscribeFromMarket,
      latestPriceMessageData,
    }),
    [
      subscribedMarkets,
      subscribeToMarket,
      unsubscribeFromMarket,
      latestPriceMessageData,
    ],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
