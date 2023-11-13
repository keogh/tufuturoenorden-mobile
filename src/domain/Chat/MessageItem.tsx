import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import type { MessageItemType } from './types';

type Props = {
  message: MessageItemType;
};
const MessageItem = ({ message }: Props) => {
  // You can add more complex logic here to handle different types of messages
  return (
    <View style={styles.messageItem}>
      {message.isSeparator ? (
        <Text style={styles.dateSeparator}>{message.text}</Text>
      ) : (
        <>
          <Text style={styles.sender}>{message.sender}</Text>
          <Text style={styles.messageText}>{message.text}</Text>
          {/* Render image if message has one */}
          {message.image && (
            <Image
              source={{ uri: message.image }}
              style={styles.messageImage}
            />
          )}
          {/* Additional content like timestamps, read receipts, etc., can be added here */}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sender: {
    fontWeight: 'bold',
  },
  messageText: {
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

export default MessageItem;
