import * as React from 'react';
import { ChatContextType, MessageItemType } from './types';
import * as ChatModel from './chatModel';
import { useAuth } from '../Auth/AuthContext';

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

  const [messages, setMessages] = React.useState<MessageItemType[]>([]);
  const [isWaitingForAnswer, setIsWaitingForAnswer] = React.useState(false);

  const appendToMessages = (message: MessageItemType) => {
    setMessages(prevMessages => [message, ...prevMessages]);
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
            id: '',
            sender: 'AI',
            text: answer.message,
          });
          console.log('Message sent: ', question)
          console.log('Answer sent: ', answer)
        } catch (e) {
          console.error('Error in postData within sendMessage: ', e);
          console.error('identityId: ', Auth.identityId)
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
        id: '',
        text,
        sender: 'Human', // TODO: Sender needs to be a constant
      };

      appendToMessages(message);
      setIsWaitingForAnswer(true);
      postData(text);
    },
    [Auth.identityId],
  );

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        isWaitingForAnswer,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
