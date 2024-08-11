import { SourceId, type MarketId } from '@price-comparator/common';
import { type PriceFetcherResult } from './types.js';
import { getReyaPrice } from './reya.js';
import { getVertexPrice } from './vertex.js';

const sourceIdToPriceFetcherMap = new Map<
  SourceId,
  (marketId: MarketId) => PriceFetcherResult
>([
  [SourceId.REYA, getReyaPrice],
  [SourceId.VERTEX, getVertexPrice],
]);

export const getPriceBySourceId = async (
  marketId: MarketId,
  sourceId: SourceId,
): PriceFetcherResult => {
  const priceFetcher = sourceIdToPriceFetcherMap.get(sourceId);

  if (!priceFetcher) {
    return null;
  }

  return priceFetcher(marketId);
};
