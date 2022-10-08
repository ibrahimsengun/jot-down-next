import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getAllTodos } from "../../../../api/todos";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  getAllTodos().then((data) => {
    res.status(200).send(data);
  });
}
