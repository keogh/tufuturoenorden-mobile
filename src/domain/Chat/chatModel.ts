import { CHAT_API_ROUTE } from "../Routes/api";

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
