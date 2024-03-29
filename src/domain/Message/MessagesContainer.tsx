import * as React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  FlatList,
} from 'react-native';
import MessageItem from './MessageItem';
import type { MessageItemType } from './types';
import MessageInput from './MessageInput'; // Import the MessageItem component

type Props = {
  messages: MessageItemType[];
};

const MessagesContainer = ({ messages }: Props) => {
  console.log('MessagesContainer messages: ', messages)
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={70}
    >
      <View style={styles.listContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) =>
            `${item.id === null ? 'null-' : item.id}-${index}`
          }
          renderItem={({ item }) => <MessageItem message={item} />}
          inverted
        />
      </View>
      <MessageInput />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8D8C91', // TODO: Theme color
  },
  listContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns the list content to the bottom
  },
  sectionHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
});

export default MessagesContainer;
