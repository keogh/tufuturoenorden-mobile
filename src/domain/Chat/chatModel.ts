import { CHAT_API_ROUTE } from '../Routes/api';
import { MessageItemType } from '../Message/types';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

export type ChatArgs = {
  uuid: string;
  question: string;
  token?: string | null;
};

export async function chat({ uuid, question, token = null }: ChatArgs) {
  const response = await fetch(CHAT_API_ROUTE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uuid,
      question,
      // token,
    }),
  });
  const body = await response.json();

  if (response.ok) {
    return body;
  }

  throw new Error(body.message);
}

export async function saveMessage(
  db: SQLiteDatabase,
  message: MessageItemType,
) {
  const response = await db.executeSql(
    `INSERT OR REPLACE INTO messages(rowid, text, sender) values (${message.id}, '${message.text}', '${message.sender}')`,
  );
  message.id = response[0].insertId;
  return message;
}
