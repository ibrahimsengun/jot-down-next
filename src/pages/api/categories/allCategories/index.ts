import { NextApiRequest, NextApiResponse } from "next";
import { getAllCategories } from "../../../../api/categories";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve) => {
    getAllCategories()
      .then((data) => {
        resolve("success");
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  });
}
