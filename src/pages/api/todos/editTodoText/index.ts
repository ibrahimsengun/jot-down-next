import { NextApiRequest, NextApiResponse } from "next";
import { editTodoText } from "../../../../api/todos";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { id, text } = body;

  return new Promise((resolve) => {
    editTodoText(id, text)
      .then(() => {
        res.status(200);
        res.end();
        resolve("Success");
      })
      .catch((error) => {
        res.status(500).send(error);
        res.end(error);
        resolve(error);
      });
  });
}
