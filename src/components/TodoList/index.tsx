import { useTodo } from "../../context/TodoContext";
import { ITodo } from "../../models/Todo";
import TodoItem from "../TodoItem";

const TodoList: React.FC = () => {
  const { todos, setSelectedTodo } = useTodo();

  return (
    <div className="flex flex-col gap-2 w-full p-5">
      <div>
        <h2 className="text-center mb-2 font-bold">Todos</h2>
      </div>
      {todos && todos?.length > 0 ? (
        todos?.map((item: ITodo, index: number) => {
          return (
            <TodoItem
              todo={item}
              key={index}
              onClick={() => setSelectedTodo(item)}
            />
          );
        })
      ) : (
        <div className="text-center">There is no Todo, how about adding ?</div>
      )}
    </div>
  );
};

export default TodoList;
