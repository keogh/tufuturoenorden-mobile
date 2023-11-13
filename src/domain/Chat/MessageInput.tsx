import * as React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const MessageInput: React.FC = () => {
  const [text, setText] = React.useState<string>('');

  const handleSend = () => {
    console.log('Send message:', text); // Replace with your send message logic
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 10,
  },
});

export default MessageInput;
