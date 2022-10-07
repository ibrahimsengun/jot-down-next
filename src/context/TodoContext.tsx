import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { ITodo } from "../models/Todo";
import {
  removeTodo,
  getAllTodos,
  addTodo,
  completeTodo,
  editTodo,
} from "../utils/firebase";

interface ITodoContext {
  todos: ITodo[];
  isLoading: boolean;
  removeTodo: (id: string) => void;
  addTodo: (text: string) => void;
  completeTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}

export const TodoContext = createContext({} as ITodoContext);

export const TodoContextProvider: React.FC<any> = (props) => {
  const { children } = props;

  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const _setTodos = useCallback((newList: ITodo[]) => {
    setTodos(newList);
  }, []);

  const getTodos = useCallback(async () => {
    const data = await getAllTodos();

    _setTodos(data);
  }, [_setTodos]);

  useEffect(() => {
    getTodos();
  }, [getTodos, isLoading]);

  const _removeTodo = useCallback((id: string) => {
    setIsLoading(true);
    removeTodo(id).then(() => setIsLoading(false));
  }, []);

  const _addTodo = useCallback((text: string) => {
    setIsLoading(true);
    addTodo(text).then(() => setIsLoading(false));
  }, []);

  const _completeTodo = useCallback((id: string) => {
    setIsLoading(true);
    completeTodo(id).then(() => setIsLoading(false));
  }, []);

  const _editTodo = useCallback((id: string, text: string) => {
    setIsLoading(true);
    editTodo(id, text).then(() => setIsLoading(false));
  }, []);

  const contextValue = useMemo(
    () => ({
      todos,
      isLoading,
      removeTodo: _removeTodo,
      addTodo: _addTodo,
      completeTodo: _completeTodo,
      editTodo: _editTodo,
    }),
    [_addTodo, _completeTodo, _editTodo, _removeTodo, isLoading, todos]
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
