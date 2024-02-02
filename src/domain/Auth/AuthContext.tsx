import * as React from 'react';
import 'react-native-get-random-values'; // This needs to be imported before uuid https://github.com/uuidjs/uuid#getrandomvalues-not-supported
import { v4 as uuidv4 } from 'uuid';
import Storage from '../Storage/storage';

export type AuthContextType = {
  identityId: string | null;
  token?: string;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [identityId, setIdentityId] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function getOrCreateIdentity() {
      try {
        let uuid: string = await Storage.get('identity-id');
        if (uuid === null) {
          uuid = uuidv4();
          await Storage.store('identity-id', uuid);
        }
        setIdentityId(uuid);
      } catch (e) {
        console.error('Error in getOrCreateIdentity within useEffect: ', e, {
          identityId,
        });
      }
    }
    getOrCreateIdentity();
  });

  return (
    <AuthContext.Provider
      value={{
        identityId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
