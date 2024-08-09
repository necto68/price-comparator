import { MarketId, PriceMessageData } from '@price-comparator/common';

export interface AppState {
  subscribedMarkets: Set<MarketId>;
  subscribeToMarket: (marketId: MarketId) => void;
  unsubscribeFromMarket: (marketId: MarketId) => void;
  latestPriceMessageData: PriceMessageData | null;
}
