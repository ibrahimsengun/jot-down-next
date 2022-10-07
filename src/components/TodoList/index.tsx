import { useTodo } from "../../context/TodoContext";
import { ITodo } from "../../models/Todo";
import TodoItem from "../TodoItem";

const TodoList: React.FC = () => {
  const { todos } = useTodo();
  return (
    <div className="flex flex-col gap-2 w-full border border-slate-500 p-10">
      <div>
        <h2 className="text-center mb-2 font-bold">Todos</h2>
      </div>
      {todos?.length > 0 ? (
        todos?.map((item: ITodo, index: number) => {
          return <TodoItem todo={item} key={index} />;
        })
      ) : (
        <div className="text-center">There is no Todo, how about adding ?</div>
      )}
    </div>
  );
};

export default TodoList;
