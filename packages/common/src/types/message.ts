import type { MarketId } from './market.js';
import type { SourceId } from './source.js';

interface TypedMessage<Type, Data> {
  data: Data;
  type: Type;
}

export enum MessageType {
  PRICE = 'PRICE',
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE',
}

export interface SubscribeMessageData {
  marketIds: MarketId[];
}

export interface UnsubscribeMessageData {
  marketIds: MarketId[];
}

export interface PriceMessageData {
  marketId: MarketId;
  sourceId: SourceId;
  timestamp: number;
  price: number;
}

export type Message =
  | TypedMessage<MessageType.PRICE, PriceMessageData>
  | TypedMessage<MessageType.SUBSCRIBE, SubscribeMessageData>
  | TypedMessage<MessageType.UNSUBSCRIBE, UnsubscribeMessageData>;
