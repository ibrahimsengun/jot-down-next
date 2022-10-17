import React from "react";
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import { useTodo } from "../../context/TodoContext";
import { ISubTodo } from "../../models/Todo";
import Button from "../Button";

interface ISubTodoItem {
  subTodo: ISubTodo;
}

const SubTodoItem: React.FC<ISubTodoItem> = ({ subTodo }) => {
  const { _id, parentId, text, isCompleted } = subTodo;
  const { completeSubTodo, selectedTodo } = useTodo();

  return (
    <div
      className={`flex gap-2 items-center border border-stone-500 rounded-sm px-1 ${
        isCompleted && "border-teal-700"
      }`}
    >
      <div>
        <Button
          icon={
            isCompleted ? (
              <BsCheckCircle size="1rem" className="text-teal-500" />
            ) : (
              <BsCircle size="1rem" />
            )
          }
          variant="borderless"
          hoveredIcon={<BsCheckCircle size="1rem" className="text-teal-500" />}
          onClick={() => {
            isCompleted
              ? null
              : completeSubTodo(parentId, _id, selectedTodo?.subTodos);
          }}
        />
      </div>
      <div className={`${isCompleted && "line-through"}`}>{text}</div>
    </div>
  );
};

export default SubTodoItem;
