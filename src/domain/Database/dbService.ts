import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export async function getDBConnection() {
  const successCb = () => console.info('success connecting to database');
  const failureCb = () => console.error('Cannot connect to database');

  return SQLite.openDatabase(
    {
      name: 'tufo-mobile.db',
      location: 'default',
    },
    successCb,
    failureCb,
  );
}

export async function createTableMessages(db: SQLiteDatabase) {
  const query = `CREATE TABLE IF NOT EXISTS messages (
    text           TEXT NOT NULL,
    sender         TEXT NOT NULL,
    
    deleteDateTime INTEGER,
    
    createDateTime INTEGER DEFAULT CURRENT_TIMESTAMP,
    updateDateTime INTEGER DEFAULT CURRENT_TIMESTAMP
  );
    CREATE TRIGGER update_messages_updateDateTime
        BEFORE  UPDATE
            ON  messages
    BEGIN
        UPDATE messages
            SET updateDateTime = unixepoch()
        WHERE rowid = old.rowid;
    END;
  `;

  await db.executeSql(query);
}

const DBService = {
  getDBConnection,
  createTableMessages,
};

export default DBService;
