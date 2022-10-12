import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getAllTodos } from "../../../../api/todos";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve) => {
    getAllTodos()
      .then((data) => {
        resolve("success");
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  });
}
