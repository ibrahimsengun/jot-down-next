import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { addTodo } from "../../../../api/todos";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { title, description } = body;

  return new Promise((resolve, reject) => {
    addTodo(title, description)
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
