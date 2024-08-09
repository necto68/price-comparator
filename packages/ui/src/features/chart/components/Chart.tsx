import { FC, useEffect, useMemo, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { type Chart as BaseChart } from 'highcharts/highstock';
import { MarketId, SourceId } from '@price-comparator/common';
import { useAppState } from '../../app/hooks/useAppState';

interface ChartProps {
  marketId: MarketId;
}

export const Chart: FC<ChartProps> = ({ marketId }) => {
  const chartRef = useRef<BaseChart>();
  const {
    subscribedMarkets,
    subscribeToMarket,
    unsubscribeFromMarket,
    latestPriceMessageData,
  } = useAppState();

  const options = useMemo(
    () => ({
      title: {
        text: marketId,
      },
      series: [
        {
          type: 'line',
          name: 'Reya',
          color: 'black',
          data: [],
        },
        {
          type: 'line',
          name: 'Vertex',
          color: '#7e61ed',
          data: [],
        },
      ],
    }),
    [marketId],
  );

  useEffect(() => {
    const chart = chartRef.current;

    if (latestPriceMessageData) {
      const {
        marketId: messageMarketId,
        sourceId,
        timestamp,
        price,
      } = latestPriceMessageData;

      if (chart && messageMarketId === marketId) {
        const seriesIndex = sourceId === SourceId.REYA ? 0 : 1;
        const series = chart.series[seriesIndex];

        const { points } = series;
        const prevPoint = points[points.length - 1];
        const { x: prevPointX, y: prevPointY } = prevPoint
          ? prevPoint
          : { x: 0, y: 0 };

        const animationOptions = {
          defer: 0,
          duration: 1500,
          easing: 'linear',
        };

        if (timestamp > prevPointX && price !== prevPointY) {
          series.addPoint([timestamp, price], true, false, animationOptions);
        }
      }
    }
  }, [latestPriceMessageData, marketId]);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
        callback={(chart: BaseChart) => {
          chartRef.current = chart;
        }}
      />
      {subscribedMarkets.has(marketId) ? (
        <button onClick={() => unsubscribeFromMarket(marketId)}>
          Unsubscribe from {marketId}
        </button>
      ) : (
        <button onClick={() => subscribeToMarket(marketId)}>
          Subscribe to {marketId}
        </button>
      )}
    </div>
  );
};
