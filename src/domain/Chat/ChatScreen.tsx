import * as React from 'react';
import { View } from 'react-native';
import MessagesContainer from './MessagesContainer';
import { MessageItemType } from './types';
import { useChat } from "./ChatContext";

const dummyMessages: MessageItemType[] = [
  { id: '2', sender: 'AI', text: 'Enough' },
  { id: '1', sender: 'Human', text: 'how much money do I have?' },
  { id: '0', sender: 'AI', text: 'Hello ' },
  { id: 'date-separator-0', sender: '', text: 'today', isSeparator: true },
  { id: '5', sender: 'AI', text: 'Enough' },
  { id: '3', sender: 'Human', text: 'how much money do I have?' },
  { id: '4', sender: 'AI', text: 'Hello ' },
  { id: '6', sender: 'AI', text: 'Enough' },
  { id: '7', sender: 'Human', text: 'how much money do I have?' },
  { id: '8', sender: 'AI', text: 'Hello ' },
  {
    id: 'date-separator-1',
    sender: '',
    text: 'yesterday',
    isSeparator: true,
  },
  { id: '9', sender: 'AI', text: 'Enough' },
  { id: '10', sender: 'Human', text: 'how much money do I have?' },
  { id: '11', sender: 'AI', text: 'Hello ' },
  { id: '12', sender: 'AI', text: 'Enough' },
  { id: '13', sender: 'Human', text: 'how much money do I have?' },
  { id: '14', sender: 'AI', text: 'Hello ' },
  {
    id: 'date-separator-2',
    sender: '',
    text: 'Nov 11, 2023',
    isSeparator: true,
  },
  { id: '15', sender: 'AI', text: 'Enough' },
  { id: '16', sender: 'Human', text: 'how much money do I have?' },
  { id: '17', sender: 'AI', text: 'Hello ' },
  { id: '18', sender: 'AI', text: 'Enough' },
  { id: '19', sender: 'Human', text: 'how much money do I have?' },
  { id: '20', sender: 'AI', text: 'Hello ' },
  {
    id: 'date-separator-3',
    sender: '',
    text: 'Nov 10, 2023',
    isSeparator: true,
  },
];

const ChatScreen = () => {
  const Chat = useChat();

  // TODO: Remove dummy messages after testing
  const messages = [...Chat.messages, ...dummyMessages];

  return (
    <View style={{ flex: 1 }}>
      <MessagesContainer messages={messages} />
    </View>
  );
};

export default ChatScreen;
