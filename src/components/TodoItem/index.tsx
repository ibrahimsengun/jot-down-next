import React, { useState } from "react";
import { BsCheckCircle, BsTrash } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsCircle, BsCircleFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardArrowRight,
} from "react-icons/md";
import Button from "../Button";
import { useTodo } from "../../context/TodoContext";
import { ITodo } from "../../models/Todo";

interface ITodoItem {
  todo: ITodo;
}

const TodoItem: React.FC<ITodoItem> = ({ todo }) => {
  const { _id, title, isCompleted, subTodos } = todo;
  const { completeTodo, removeTodo } = useTodo();
  const [alertText, setAlertText] = useState<string>("");

  return (
    <div
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
            {title}
          </div>
        </div>

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
      </div>
      {alertText && (
        <div className="justify-self-center animate-bounce absolute ">
          <span className="relative top-4 left-96 bg-stone-800 w-fit p-3 rounded-lg border border-red-500">
            {alertText}
          </span>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
