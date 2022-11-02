import { MongoClient } from "../../axios";

export const categoryDbInfos = {
  collection: "categories",
  database: "TodoDatabase",
  dataSource: "Cluster0",
};

export const getAllCategories = async () => {
  return await MongoClient.post("find", {
    ...categoryDbInfos,
  }).then((data) => {
    return data.data.documents;
  });
};
