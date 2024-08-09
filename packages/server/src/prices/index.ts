import { type MarketId, SourceId } from '@price-comparator/common';
import { getMarketsWithSubscribers } from '../database/markets';
import { getPriceMessage, sendMessageToMarketSubscribers } from '../messages';
import { getPriceBySourceId } from '../price-fetchers';
import { PRICES_UPDATE_INTERVAL } from './constants';

interface Param {
  marketId: MarketId;
  sourceId: SourceId;
}

export const updatePrices = async (): Promise<void> => {
  const markets = getMarketsWithSubscribers();

  const paramArray: Param[] = [];

  markets.forEach((marketId) => {
    Object.values(SourceId).forEach((sourceId) => {
      paramArray.push({ marketId, sourceId });
    });
  });

  const promises = paramArray.map(async ({ marketId, sourceId }) => {
    const price = await getPriceBySourceId(marketId, sourceId);

    if (price) {
      const message = getPriceMessage(marketId, sourceId, price);

      sendMessageToMarketSubscribers(marketId, message);
    }
  });

  await Promise.all(promises);
};

export const initPricesUpdater = (): void => {
  setInterval(() => {
    void updatePrices();
  }, PRICES_UPDATE_INTERVAL);
};
