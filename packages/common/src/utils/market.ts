import { MarketId } from '../types';

export const isValidMarketId = (marketId: MarketId): boolean =>
  Object.values(MarketId).includes(marketId);
