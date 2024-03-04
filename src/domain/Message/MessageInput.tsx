import * as React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useChat } from '../Chat/ChatContext';

const MessageInput: React.FC = () => {
  const [text, setText] = React.useState<string>('');
  const Chat = useChat();

  const handleSend = React.useCallback(() => {
    Chat.sendMessage(text);
    setText('');
  }, [Chat, text]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Message TuFo..."
        multiline
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 35,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 28,
    marginRight: 10,
    textAlignVertical: 'top',
  },
});

export default MessageInput;
