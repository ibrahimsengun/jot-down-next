import React, { useState, useRef } from "react";
import { BsTrash, BsCircle } from "react-icons/bs";
import Button from "../Button";
import { useTodo } from "../../context/TodoContext";
import { ITodo } from "../../models/Todo";

interface ITodoItem {
  todo: ITodo;
}

const TodoItem: React.FC<ITodoItem> = ({ todo }) => {
  const { _id, text, isCompleted } = todo;
  const { completeTodo, removeTodo } = useTodo();

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${
        isCompleted ? "todo-item-completed" : "todo-item-notcompleted"
      }`}
    >
      <div className="flex items-center">
        {!isCompleted && (
          <>
            <div>
              <Button
                icon={<BsCircle size="1.3rem" />}
                className="mr-2"
                variant="borderless"
                onClick={() => completeTodo(_id)}
                title="Check"
              />
            </div>
          </>
        )}
        <div className="flex flex-col gap-3">
          <div
            className={`text-lg font-bold ${
              isCompleted ? " line-through text-stone-500" : ""
            }`}
          >
            {text}
          </div>
        </div>

        {isHovered && (
          <div className="flex order-2 justify-end ml-auto">
            <div>
              <Button
                icon={<BsTrash size="1.3rem" />}
                className="ml-2"
                variant="borderless"
                onClick={() => removeTodo(_id)}
                title="Delete"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
