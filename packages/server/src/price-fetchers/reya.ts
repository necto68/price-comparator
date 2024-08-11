import { ApiClient } from '@reyaxyz/api-sdk';
import { MarketId } from '@price-comparator/common';
import { type PriceFetcherResult } from './types.js';

ApiClient.configure('production');

const marketIdToReyaMarketIdMap = new Map<MarketId, number>([
  [MarketId.BTCUSD, 2],
  [MarketId.ETHUSD, 1],
  [MarketId.SOLUSD, 3],
  [MarketId.ARBUSD, 4],
  [MarketId.OPUSD, 5],
  [MarketId.AVAXUSD, 6],
]);

export const getReyaPrice = async (marketId: MarketId): PriceFetcherResult => {
  const reyaMarketId = marketIdToReyaMarketIdMap.get(marketId);

  if (typeof reyaMarketId === 'undefined') {
    return null;
  }

  try {
    const { price } = await ApiClient.markets.getPoolPrice({
      id: reyaMarketId,
    });

    return price;
  } catch (error) {
    // eslint-disable-next-line no-console -- This is a server-side script
    console.error(error);

    return null;
  }
};
