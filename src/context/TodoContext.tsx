import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { NextAPI } from "../axios";
import { ITodo } from "../models/Todo";

interface ITodoContext {
  todos: ITodo[];
  isLoading: boolean;
  addTodo: (title: string, description?: string) => void;
  removeTodo: (id?: string) => void;
  completeTodo: (id?: string) => void;
  // editTodo: (id: string, text: string) => void;
}

export const TodoContext = createContext({} as ITodoContext);

export const TodoContextProvider: React.FC<any> = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const _setTodos = useCallback((newList: ITodo[]) => {
    setTodos(newList);
  }, []);

  const getTodos = useCallback(async () => {
    const data = await NextAPI.get<ITodo[]>("/api/todos/allTodos").then(
      (res) => {
        return res.data;
      }
    );

    _setTodos(data);
  }, [_setTodos]);

  useEffect(() => {
    getTodos();
  }, [getTodos, isLoading]);

  const addTodo = useCallback(async (title: string, description?: string) => {
    setIsLoading(true);
    await NextAPI.post("api/todos/addTodo", { title, description }).then(() =>
      setIsLoading(false)
    );
  }, []);

  const removeTodo = useCallback(async (id?: string) => {
    setIsLoading(true);
    await NextAPI.post("api/todos/removeTodo", { id }).then(() =>
      setIsLoading(false)
    );
  }, []);

  const completeTodo = useCallback(async (id?: string) => {
    setIsLoading(true);
    await NextAPI.post("api/todos/completeTodo", { id }).then(() =>
      setIsLoading(false)
    );
  }, []);

  // const _editTodo = useCallback((id: string, text: string) => {
  //   setIsLoading(true);
  //   editTodo(id, text).then(() => setIsLoading(false));
  // }, []);

  const contextValue = useMemo(
    () => ({
      todos,
      isLoading,
      addTodo,
      removeTodo,
      completeTodo,
      // editTodo: _editTodo,
    }),
    [
      todos,
      isLoading,
      addTodo,
      removeTodo,
      completeTodo,
      //   _editTodo,
    ]
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
