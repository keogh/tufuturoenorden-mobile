// TODO: Install typescript eslint and prettier support
// eslint-disable objectCurlySpacing
export type MessageItemType = {
  id: string;
  sender: string;
  text: string;
  image?: string;
  isSeparator?: boolean;
};

export type ChatContextType = {
  messages: MessageItemType[];
  isWaitingForAnswer: boolean;
  sendMessage: (text: string) => void;
};
