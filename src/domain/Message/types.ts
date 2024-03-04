export type MessageItemSenderType = 'HUMAN' | 'AI' | 'SYSTEM';

export type MessageItemType = {
  id: null | string | number;
  sender: MessageItemSenderType;
  text: string;
  createDateTime?: string;
  image?: string;
  isSeparator?: boolean;
};
