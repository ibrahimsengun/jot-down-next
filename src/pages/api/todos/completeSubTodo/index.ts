import { NextApiRequest, NextApiResponse } from "next";
import { completeSubTodo } from "../../../../api/todos";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { id, subTodoId, subTodos } = body;

  return new Promise((resolve) => {
    completeSubTodo(id, subTodoId, subTodos)
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
