import * as React from 'react';
import { ChatProvider } from './ChatContext';
import ChatScreen from './ChatScreen';

const ChatScreenWithProvider = () => {
  return (
    <ChatProvider>
      <ChatScreen />
    </ChatProvider>
  );
};

export default ChatScreenWithProvider;
