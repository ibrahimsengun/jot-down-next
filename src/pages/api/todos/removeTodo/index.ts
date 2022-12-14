import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { removeTodo } from "../../../../api/todos";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { id } = body;

  return new Promise((resolve) => {
    removeTodo(id)
      .then(() => {
        res.status(200);
        res.end();
        resolve("success");
      })
      .catch((error) => {
        res.status(500).send(error);
        res.end(error);
        resolve(error);
      });
  });
}
