import * as React from 'react';
import { View } from 'react-native';
import MessagesContainer from '../Message/MessagesContainer';
import { useChat } from './ChatContext';

const ChatScreen = () => {
  const Chat = useChat();

  const messages = Chat.messages;

  return (
    <View style={{ flex: 1 }}>
      <MessagesContainer messages={messages} />
    </View>
  );
};

export default ChatScreen;
