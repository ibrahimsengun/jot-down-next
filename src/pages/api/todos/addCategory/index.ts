import { NextApiRequest, NextApiResponse } from "next";
import { addCategory } from "../../../../api/todos";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { id, category } = body;

  return new Promise((resolve) => {
    addCategory(id, category)
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
