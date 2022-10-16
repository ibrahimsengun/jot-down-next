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
import { ISubTodo, ITodo } from "../models/Todo";

interface ITodoContext {
  todos: ITodo[] | undefined;
  selectedTodo: ITodo | undefined;
  isLoading: boolean;
  addTodo: (text: string) => void;
  removeTodo: (id?: string) => void;
  completeTodo: (id?: string) => void;
  addSubTodo: (id?: string, todo?: ISubTodo, subTodos?: ISubTodo[]) => void;
  setSelectedTodo: (todo: ITodo) => void;
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

  const [selectedTodo, _setSelectedTodo] = useState<ITodo | undefined>(
    undefined
  );

  const setSelectedTodo = useCallback((todo: ITodo) => {
    _setSelectedTodo(todo);
  }, []);

  const addTodo = useCallback(
    async (text: string) => {
      await NextAPI.post("api/todos/addTodo", { text }).then(() =>
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
    async (id?: string, todo?: ISubTodo, subTodos?: ISubTodo[]) => {

      await NextAPI.post("api/todos/addSubTodo", { id, todo, subTodos }).then(
        () => mutateTodos()
      );
    },
    [mutateTodos]
  );
  const contextValue: ITodoContext = useMemo(
    () => ({
      todos,
      selectedTodo,
      isLoading,
      addTodo,
      removeTodo,
      completeTodo,
      setSelectedTodo,
      addSubTodo,
    }),
    [
      todos,
      selectedTodo,
      isLoading,
      addTodo,
      removeTodo,
      completeTodo,
      setSelectedTodo,
      addSubTodo,
    ]
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
