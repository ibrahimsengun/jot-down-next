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
  addTodo: (title: string) => void;
  removeTodo: (id?: string) => void;
  completeTodo: (id?: string) => void;
  addSubTodo: (id?: string, subTodo?: string) => void;
}

export const TodoContext = createContext({} as ITodoContext);

const fetcher = (url: string) => NextAPI.get(url).then((res) => res.data);

export const TodoContextProvider: React.FC<any> = ({ children }) => {
  const {
    data: todos,
    isValidating: isLoading,
    mutate: mutateTodos,
  } = useSWR<ITodo[], Error>("/api/todos/allTodos", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const addTodo = useCallback(
    async (title: string) => {
      await NextAPI.post("api/todos/addTodo", { title }).then(() =>
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

  const addSubTodo = useCallback(
    async (id?: string, subTodo?: string) => {
      await NextAPI.post("api/todos/addSubTodo", { id, subTodo }).then(
        () => mutateTodos
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
      addSubTodo,
    }),
    [todos, isLoading, addTodo, removeTodo, completeTodo, addSubTodo]
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
