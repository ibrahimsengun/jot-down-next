import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getAllTodos } from "../../../../api/todos";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    getAllTodos()
      .then((data) => {
        res.status(200).send(data);
        res.end(data);
        resolve("success");
      })
      .catch((error) => {
        res.status(500).send(error);
        res.end(error);
        resolve(error);
      });
  });
}
