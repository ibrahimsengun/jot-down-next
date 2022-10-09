import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import useSWR from "swr";
import { NextAPI } from "../axios";
import { ITodo } from "../models/Todo";

interface ITodoContext {
  todos: ITodo[] | undefined;
  isLoading: boolean;
  addTodo: (title: string, description?: string) => void;
  removeTodo: (id?: string) => void;
  completeTodo: (id?: string) => void;
  editTodo: (id: string, text: string) => void;
}

export const TodoContext = createContext({} as ITodoContext);

const fetcher = (url: string) => NextAPI.get(url).then((res) => res.data);

export const TodoContextProvider: React.FC<any> = ({ children }) => {
  const {
    data: todos,
    error,
    isValidating: isLoading,
    mutate: mutateTodos,
  } = useSWR<ITodo[], Error>("/api/todos/allTodos", fetcher);

  const addTodo = useCallback(
    async (title: string, description?: string) => {
      await NextAPI.post("api/todos/addTodo", { title, description }).then(() =>
        mutateTodos()
      );
    },
    [mutateTodos]
  );

  const removeTodo = useCallback(
    async (id?: string) => {
      await NextAPI.post("api/todos/removeTodo", { id }).then(() =>
        mutateTodos()
      );
    },
    [mutateTodos]
  );

  const completeTodo = useCallback(
    async (id?: string) => {
      await NextAPI.post("api/todos/completeTodo", { id }).then(() =>
        mutateTodos()
      );
    },
    [mutateTodos]
  );

  const contextValue = useMemo(
    () => ({
      todos,
      isLoading,
      addTodo,
      removeTodo,
      completeTodo,
    }),
    [todos, isLoading, addTodo, removeTodo, completeTodo]
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
