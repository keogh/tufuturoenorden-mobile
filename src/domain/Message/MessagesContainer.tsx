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
    // backgroundColor: 'yellow',
  },
  listContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns the list content to the bottom
    // backgroundColor: 'red',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end', // Ensures the content inside is also bottom-aligned
    backgroundColor: 'blue',
  },
  sectionHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
});

export default MessagesContainer;
