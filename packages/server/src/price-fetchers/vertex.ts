import { MarketId } from '@price-comparator/common';
import { createVertexClient } from '@vertex-protocol/client';
import { JsonRpcProvider } from 'ethers';
import { type PriceFetcherResult } from './types';

const marketIdToVertexProductIdMap = new Map<MarketId, number>([
  [MarketId.BTCUSD, 2],
  [MarketId.ETHUSD, 4],
  [MarketId.SOLUSD, 12],
  [MarketId.ARBUSD, 6],
  [MarketId.OPUSD, 18],
  [MarketId.AVAXUSD, 52],
]);

const provider = new JsonRpcProvider('https://arb1.arbitrum.io/rpc');

export const getVertexPrice = async (
  marketId: MarketId,
): PriceFetcherResult => {
  const vertexProductId = marketIdToVertexProductIdMap.get(marketId);

  if (typeof vertexProductId === 'undefined') {
    return null;
  }

  try {
    const vertexClient = await createVertexClient('arbitrum', {
      signerOrProvider: provider,
    });

    const { markPrice } = await vertexClient.perp.getPerpPrices({
      productId: vertexProductId,
    });

    return markPrice.toNumber();
  } catch (error) {
    // eslint-disable-next-line no-console -- This is a server-side script
    console.error(error);

    return null;
  }
};
