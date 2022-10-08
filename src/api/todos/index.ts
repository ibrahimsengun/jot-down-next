import axios from "axios";
import { MongoClient } from "../../axios";
import { IMongoResponse } from "../../models/mongo";
import { ITodo } from "../../models/Todo";

const collectionName = "todos";
const databaseName = "TodoDatabase";
const dataSourceName = "Cluster0";

const dbInfos = {
  collection: collectionName,
  database: databaseName,
  dataSource: dataSourceName,
};

export const getAllTodos = async () => {
  return await MongoClient.post("find", dbInfos).then((data) => {
    return data.data.documents;
  });
};

export const addTodo = async (title: string, description?: string) => {
  return await MongoClient.post("insertOne", {
    ...dbInfos,
    document: {
      title,
      description,
      isCompleted: false,
    } as ITodo,
  });
};

export const removeTodo = async (id: string) => {
  return await MongoClient.post("deleteOne", {
    ...dbInfos,
    filter: { _id: { $oid: id } },
  });
};

export const completeTodo = async (id: string) => {
  return await MongoClient.post("updateOne", {
    ...dbInfos,
    filter: { _id: { $oid: id } },
    update: { $set: { isCompleted: true } },
  });
};
