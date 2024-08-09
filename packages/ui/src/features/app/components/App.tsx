import { MarketId } from '@price-comparator/common';
import { Chart } from '../../chart/components/Chart';
import { AppStateProvider } from '../providers/AppStateProvider';
import styles from '../styles/App.module.css';

export const App = () => {
  return (
    <AppStateProvider>
      <div className={styles.container}>
        <Chart marketId={MarketId.BTCUSD} />
        <Chart marketId={MarketId.ETHUSD} />
      </div>
    </AppStateProvider>
  );
};
