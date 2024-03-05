import * as React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import type { MessageItemType } from './types';
import { AI_SENDER, HUMAN_SENDER } from './constants';

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

  const isHuman = message.sender === HUMAN_SENDER;
  const containerStyles: StyleProp<ViewStyle> = [styles.messageItemContainer];
  if (isHuman) {
    containerStyles.push(styles.messageItemContainerHuman);
  }

  return (
    <View style={containerStyles}>
      {message.sender === AI_SENDER && (
        <View style={styles.messageItemAvatarContainer}>
          <Text style={styles.messageItemAvatar}>🤖</Text>
        </View>
      )}
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
    justifyContent: 'flex-start',
    flexDirection: 'row',
    gap: 5,
    marginVertical: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  messageItemContainerHuman: {
    justifyContent: 'flex-end',
  },
  messageItemAvatarContainer: {
    alignSelf: 'flex-end',
    width: 'auto',
    height: 'auto',
    backgroundColor: '#666666', // TODO: Theme color
    borderRadius: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  messageItemAvatar: {
    fontSize: 28,
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
    maxWidth: '75%',
    padding: 16,
    borderRadius: 24,
    borderBottomLeftRadius: 0,
    display: 'flex',
    flexDirection: 'column',
  },
});

const messagesStyles = StyleSheet.create({
  messageItemHuman: {
    ...baseMessagesStyles.messageItem,
    backgroundColor: '#5a5a5a', // TODO: Theme color
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 24,
    maxWidth: '85%',
  },
  messageItemSeparator: {
    ...baseMessagesStyles.messageItem,
    backgroundColor: '#333',
    alignSelf: 'center',
  },
});

export default MessageItem;
