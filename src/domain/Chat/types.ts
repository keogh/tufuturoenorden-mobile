// TODO: Install typescript eslint and prettier support
// eslint-disable objectCurlySpacing
import { MessageItemType } from '../Message/types';

export type ChatContextType = {
  messages: MessageItemType[];
  isWaitingForAnswer: boolean;
  sendMessage: (text: string) => void;
};
