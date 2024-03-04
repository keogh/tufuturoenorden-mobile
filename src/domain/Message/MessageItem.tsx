import * as React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import type { MessageItemType } from './types';
import { HUMAN_SENDER } from './constants';

type Props = {
  message: MessageItemType;
};
const MessageItem = ({ message }: Props) => {
  // You can add more complex logic here to handle different types.ts of messages

  let viewContentStyles: StyleProp<ViewStyle> = baseMessagesStyles.messageItem;
  if (message.sender === HUMAN_SENDER) {
    viewContentStyles = messagesStyles.messageItemHuman;
  } else if (message.isSeparator) {
    viewContentStyles = messagesStyles.messageItemSeparator;
  }

  return (
    <View style={styles.messageItemContainer}>
      <View style={viewContentStyles}>
        <Text
          style={
            message.isSeparator ? styles.dateSeparator : styles.messageText
          }
        >
          {message.text}
        </Text>
        <Text style={styles.timestamp}>{message.createDateTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: 5,
  },
  sender: {
    width: 'auto',
    fontWeight: 'bold',
  },
  timestamp: {
    textAlign: 'right',
    fontSize: 10,
    color: '#c9c9c9',
  },
  messageText: {
    width: 'auto',
    color: '#f9f9f9', // TODO: Theme color
    fontSize: 14,
    lineHeight: 18,
  },
  messageImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginTop: 10,
  },
  dateSeparator: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const baseMessagesStyles = StyleSheet.create({
  messageItem: {
    backgroundColor: '#424242', // TODO: Theme color
    color: '#FFF', // TODO: Theme color
    alignSelf: 'flex-start',
    maxWidth: '85%',
    padding: 12,
    borderRadius: 12,
    marginLeft: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
});

const messagesStyles = StyleSheet.create({
  messageItemHuman: {
    ...baseMessagesStyles.messageItem,
    backgroundColor: '#5a5a5a', // TODO: Theme color
    alignSelf: 'flex-end',
    marginRight: 5,
  },
  messageItemSeparator: {
    ...baseMessagesStyles.messageItem,
    backgroundColor: '#333',
    alignSelf: 'center',
  },
});

export default MessageItem;
