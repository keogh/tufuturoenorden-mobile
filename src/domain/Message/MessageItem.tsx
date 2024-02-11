import * as React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import type { MessageItemType } from '../Chat/types';

type Props = {
  message: MessageItemType;
};
const MessageItem = ({ message }: Props) => {
  // You can add more complex logic here to handle different types.ts of messages

  let viewContentStyles: StyleProp<ViewStyle> = baseMessagesStyles.messageItem;
  if (message.sender === 'Human') {
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'gray',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sender: {
    width: 'auto',
    fontWeight: 'bold',
  },
  messageText: {
    width: 'auto',
    color: 'black',
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
    backgroundColor: 'red',
    alignSelf: 'flex-start',
    maxWidth: '85%',
    padding: 12,
    borderRadius: 12,
    marginLeft: 5,
  },
});

const messagesStyles = StyleSheet.create({
  messageItemHuman: {
    ...baseMessagesStyles.messageItem,
    backgroundColor: 'green',
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
