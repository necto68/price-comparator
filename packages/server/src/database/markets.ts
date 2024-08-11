import { type MarketId } from '@price-comparator/common';
import { isValidMarketId } from '@price-comparator/common';

const marketToSubscribersMap = new Map<MarketId, Set<string>>();

export const getMarketsWithSubscribers = (): MarketId[] =>
  Array.from(marketToSubscribersMap.keys());

export const getSubscribersByMarketId = (
  marketId: MarketId,
): Set<string> | undefined => {
  return marketToSubscribersMap.get(marketId);
};

export const subscribeUserToMarket = (
  userId: string,
  marketId: MarketId,
): void => {
  const subscribers = marketToSubscribersMap.get(marketId);

  if (subscribers && !subscribers.has(userId)) {
    subscribers.add(userId);
  } else if (!subscribers && isValidMarketId(marketId)) {
    // init new subscribers set
    marketToSubscribersMap.set(marketId, new Set([userId]));
  }
};

export const unsubscribeUserFromMarket = (
  userId: string,
  marketId: MarketId,
): void => {
  const subscribers = marketToSubscribersMap.get(marketId);

  if (subscribers?.has(userId)) {
    subscribers.delete(userId);
  }

  if (subscribers && !subscribers.size) {
    marketToSubscribersMap.delete(marketId);
  }
};

export const unsubscribeUserFromMarkets = (userId: string): void => {
  for (const [marketId, subscribers] of marketToSubscribersMap) {
    if (subscribers.has(userId)) {
      unsubscribeUserFromMarket(userId, marketId);
    }
  }
};
