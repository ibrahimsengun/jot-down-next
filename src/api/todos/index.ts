import axios from "axios";
import { MongoClient } from "../../axios";
import uniqid from "uniqid";
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
  return await MongoClient.post("find", {
    ...dbInfos,
    sort: { isCompleted: 1 },
  }).then((data) => {
    return data.data.documents;
  });
};

export const addTodo = async (text: string) => {
  return await MongoClient.post("insertOne", {
    ...dbInfos,
    document: {
      text,
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