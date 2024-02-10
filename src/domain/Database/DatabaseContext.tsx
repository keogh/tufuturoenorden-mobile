import * as React from 'react';
import DBService from './dbService';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

export type DatabaseContextType = {
  db: SQLiteDatabase | null;
};

const DatabaseContext = React.createContext<DatabaseContextType | undefined>(
  undefined,
);

export const useDatabase = () => {
  const context = React.useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const DatabaseProvider = ({ children }: Props) => {
  const [db, setDB] = React.useState<DatabaseContextType['db']>(null);

  React.useEffect(() => {
    async function createDBTables() {
      try {
        const databaseConnection = await DBService.getDBConnection();
        setDB(databaseConnection);

        await DBService.createTableMessages(databaseConnection);
      } catch (e) {
        console.log('Error while creating the Tables: ', e);
      }
    }

    createDBTables();
  }, []);

  const context = React.useMemo(() => {
    return {
      db,
    };
  }, [db]);

  return (
    <DatabaseContext.Provider value={context}>
      {children}
    </DatabaseContext.Provider>
  );
};
