import * as React from 'react';
import { ChatContextType, MessageItemType } from './types';

const ChatContext = React.createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = React.useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const ChatProvider = ({ children }: Props) => {
  const [messages, setMessages] = React.useState<MessageItemType[]>([]);

  const sendMessage = (message: MessageItemType) => {
    setMessages(prevMessages => [message, ...prevMessages]);
    // Add logic to send message to backend or handle it as needed
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
