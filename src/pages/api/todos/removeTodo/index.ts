import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { removeTodo } from "../../../../api/todos";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { id } = body;

  await removeTodo(id)
    .then(() => {
      res.status(200);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}
