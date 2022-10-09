import { useTodo } from "../../context/TodoContext";
import { ITodo } from "../../models/Todo";
import TodoItem from "../TodoItem";

const TodoList: React.FC = () => {
  const { todos, isLoading } = useTodo();

  const loadingSkeleton = (
    <div className="flex flex-col gap-3 animate-pulse w-full border border-stone-500 p-10">
      <div className="border px-3 py-3 rounded-full bg-stone-800"></div>
      <div className="border px-3 py-3 rounded-full bg-stone-800"></div>
      <div className="border px-3 py-3 rounded-full bg-stone-800"></div>
      <div className="border px-3 py-3 rounded-full bg-stone-800"></div>
    </div>
  );

  if (isLoading) return loadingSkeleton;

  return (
    <div className="flex flex-col gap-2 w-full border border-stone-500 p-10">
      <div>
        <h2 className="text-center mb-2 font-bold">Todos</h2>
      </div>
      {todos && todos?.length > 0 ? (
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
