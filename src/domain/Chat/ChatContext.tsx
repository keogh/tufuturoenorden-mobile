import * as React from 'react';
import { ChatContextType } from './types';
import { MessageItemType } from '../Message/types';
import * as ChatModel from './chatModel';
import { useAuth } from '../Auth/AuthContext';
import { useDatabase } from '../Database/DatabaseContext';
import { Text } from 'react-native';
import { AI_SENDER, HUMAN_SENDER } from '../Message/constants';

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

  const appendToMessages = React.useCallback(
    async (message: MessageItemType) => {
      if (db === null) {
        throw 'DB unknown.';
      }

      try {
        const savedMessage = await ChatModel.saveMessage(db, message);
        setMessages(prevMessages => {
          return [savedMessage, ...prevMessages];
        });
      } catch (e) {
        console.error(
          'Error while trying to save the message into DB. Error: ',
          e,
        );
        // TODO: Append an error message to the conversation
      }
    },
    [db],
  );

  const sendMessage = React.useCallback(
    (text: string) => {
      const sendMessageFlow = async (question: string) => {
        const message: MessageItemType = {
          id: null,
          text: question,
          sender: HUMAN_SENDER,
        };
        await appendToMessages(message);

        try {
          // TODO: check Auth.token and include it in the payload, and if token dont include uuid
          const answer = await ChatModel.chat({
            uuid: Auth.identityId ?? '',
            question: message.text,
          });

          await appendToMessages({
            id: null,
            sender: AI_SENDER,
            text: answer.message,
          });
          console.log('Message sent: ', message.text);
          console.log('Answer sent: ', answer);
        } catch (e) {
          console.error('Error in postData within sendMessage: ', e);
          console.error('identityId: ', Auth.identityId);
          // TODO: Add dismissible error message to messages list
        } finally {
          setIsWaitingForAnswer(false);
        }
      };

      setIsWaitingForAnswer(true);
      return sendMessageFlow(text);
    },
    [Auth.identityId, appendToMessages],
  );

  React.useEffect(() => {
    async function fetch() {
      if (db === null) {
        return;
      }
      const items = await ChatModel.fetchMessages(db);
      setMessages(items);
    }

    fetch();
  }, [db]);

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
