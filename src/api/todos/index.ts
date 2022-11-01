import { MongoClient } from "../../axios";
import { ISubTodo, ITodo, ITodoCategory } from "../../models/Todo";

const todoDbInfos = {
  collection: "todos",
  database: "TodoDatabase",
  dataSource: "Cluster0",
};

const categoryDbInfos = {
  collection: "categories",
  database: "TodoDatabase",
  dataSource: "Cluster0",
};

export const getAllTodos = async () => {
  return await MongoClient.post("find", {
    ...todoDbInfos,
    sort: { isCompleted: 1 },
  }).then((data) => {
    return data.data.documents;
  });
};

export const addTodo = async (text: string) => {
  return await MongoClient.post("insertOne", {
    ...todoDbInfos,
    document: {
      text,
      isCompleted: false,
    } as ITodo,
  });
};

export const removeTodo = async (id: string) => {
  return await MongoClient.post("deleteOne", {
    ...todoDbInfos,
    filter: { _id: { $oid: id } },
  });
};

export const completeTodo = async (id: string) => {
  return await MongoClient.post("updateOne", {
    ...todoDbInfos,
    filter: { _id: { $oid: id } },
    update: { $set: { isCompleted: true } },
  });
};

export const editTodoText = async (id: string, text: string) => {
  return await MongoClient.post("updateOne", {
    ...todoDbInfos,
    filter: { _id: { $oid: id } },
    update: { $set: { text: text } },
  });
};

export const addSubTodo = async (
  id: string,
  todo: ISubTodo,
  subTodos?: ISubTodo[]
) => {
  return await MongoClient.post("updateOne", {
    ...todoDbInfos,
    filter: { _id: { $oid: id } },
    update:
      subTodos == undefined
        ? { $set: { subTodos: [todo] } }
        : { $set: { subTodos: [...subTodos, todo] } },
  });
};

export const completeSubTodo = async (
  id: string,
  subTodoId: string,
  subTodos?: ISubTodo[]
) => {
  subTodos?.map((item: ISubTodo) => {
    if (item._id == subTodoId) item.isCompleted = true;
    return item;
  });

  return await MongoClient.post("updateOne", {
    ...todoDbInfos,
    filter: { _id: { $oid: id } },
    update: { $set: { subTodos: subTodos } },
  });
};

export const addCategory = async (todoId: string, category: ITodoCategory) => {
  MongoClient.post("insertOne", {
    ...categoryDbInfos,
    document: { category: category },
  });
  return await MongoClient.post("updateOne", {
    ...todoDbInfos,
    filter: { _id: { $oid: todoId } },
    update: { $set: { category: category } },
  });
};
