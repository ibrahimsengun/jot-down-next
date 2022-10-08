import axios from "axios";
import { IMongoResponse } from "../../models/mongo";
import { ITodo } from "../../models/Todo";

const api_key =
  "XRmtsHZKxbPW8yQVeZmkIBYDaLLqpOfEj3sD1Rbbmz1N4aJ7mfvihlx7AISsYdBB";
const collectionName = "todos";
const databaseName = "TodoDatabase";
const dataSourceName = "Cluster0";

const AxiosClient = axios.create({
  baseURL:
    "https://data.mongodb-api.com/app/data-odjty/endpoint/data/v1/action/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key": api_key,
  },
});

export const getAllTodos = async () => {
  return await AxiosClient.post<IMongoResponse<ITodo[]>>("find", {
    collection: collectionName,
    database: databaseName,
    dataSource: dataSourceName,
  }).then((data) => {
    return data.data.documents;
  });
};
