export type MessageItemType = {
  id: null | string | number;
  sender: string;
  text: string;
  image?: string;
  isSeparator?: boolean;
};
