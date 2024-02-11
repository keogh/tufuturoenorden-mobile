import * as React from 'react';
import { ChatContextType } from './types';
import { MessageItemType } from '../Message/types';
import * as ChatModel from './chatModel';
import { useAuth } from '../Auth/AuthContext';
import { useDatabase } from '../Database/DatabaseContext';
import { Text } from 'react-native';

const ChatContext = React.createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = React.useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const ChatProvider = ({ children }: Props) => {
  const Auth = useAuth();
  const { db } = useDatabase();

  const [messages, setMessages] = React.useState<MessageItemType[]>([]);
  const [isWaitingForAnswer, setIsWaitingForAnswer] = React.useState(false);

  const appendToMessages = async (message: MessageItemType) => {
    try {
      await db?.executeSql(
        `INSERT OR REPLACE INTO messages(rowid, text, sender) values (${message.id}, '${message.text}', '${message.sender}')`,
      );
      setMessages(prevMessages => [message, ...prevMessages]);
    } catch (e) {
      console.error(
        'Error while trying to save the message into DB. Error: ',
        e,
      );
      // TODO: Append an error message to the conversation
    }
  };

  const sendMessage = React.useCallback(
    (text: string) => {
      async function postData(question: string) {
        try {
          // TODO: check Auth.token and include it in the payload, and if token dont include uuid
          const answer = await ChatModel.chat({
            uuid: Auth.identityId ?? '',
            question,
          });
          appendToMessages({
            id: null,
            sender: 'AI',
            text: answer.message,
          });
          console.log('Message sent: ', question);
          console.log('Answer sent: ', answer);
        } catch (e) {
          console.error('Error in postData within sendMessage: ', e);
          console.error('identityId: ', Auth.identityId);
          // TODO: Add dismissible error message to messages list
        } finally {
          setIsWaitingForAnswer(false);
        }
      }

      /*  TODO:
       * - create buildMessage
       * - Store message in local sqlite table
       */
      const message: MessageItemType = {
        id: null,
        text,
        sender: 'Human', // TODO: Sender needs to be a constant
      };

      appendToMessages(message);
      setIsWaitingForAnswer(true);
      postData(text);
    },
    [Auth.identityId, appendToMessages],
  );

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        isWaitingForAnswer,
      }}
    >
      {db === null ? <Text>loading...</Text> : children}
    </ChatContext.Provider>
  );
};
