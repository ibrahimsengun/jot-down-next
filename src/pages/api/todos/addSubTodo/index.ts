import { NextApiRequest, NextApiResponse } from "next";
import { addSubTodo } from "../../../../api/todos";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { id, subTodo } = body;

  return new Promise((resolve) => {
    addSubTodo(id, subTodo)
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
