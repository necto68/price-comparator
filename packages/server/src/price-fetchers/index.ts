import { SourceId, type MarketId } from '@price-comparator/common';
import { type PriceFetcherResult } from './types';
import { getReyaPrice } from './reya';
import { getVertexPrice } from './vertex';

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
