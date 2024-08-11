import { MarketId } from '../types/index.js';

export const isValidMarketId = (marketId: MarketId): boolean =>
  Object.values(MarketId).includes(marketId);
