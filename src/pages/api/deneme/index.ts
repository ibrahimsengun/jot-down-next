import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  axios
    .post(
      "https://data.mongodb-api.com/app/data-odjty/endpoint/data/v1/action/find",
      { collection: "todos", database: "TodoDatabase", dataSource: "Cluster0" },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key":
            "XRmtsHZKxbPW8yQVeZmkIBYDaLLqpOfEj3sD1Rbbmz1N4aJ7mfvihlx7AISsYdBB",
        },
      }
    )
    .then((data) => {
      res.status(200).send(data.data);
    });
}
