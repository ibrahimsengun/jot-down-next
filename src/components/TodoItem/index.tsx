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
  isSubTodo?: boolean;
}

const TodoItem: React.FC<ITodoItem> = ({ todo, isSubTodo = false }) => {
  const { _id, title, isCompleted, subTodos } = todo;
  const { completeTodo, removeTodo, addSubTodo } = useTodo();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [subTodoText, setSubTodoText] = useState<string>("");
  const [alertText, setAlertText] = useState<string>("");

  const arrowIcon = isExpanded ? (
    <MdKeyboardArrowUp size="1.5rem" />
  ) : (
    <MdKeyboardArrowDown size="1.5rem" />
  );

  const expandClickHandler = () => {
    setIsExpanded((prev) => !prev);
  };

  const addSubTodoClickHandler = () => {
    if (subTodoText.length > 0) {
      addSubTodo(_id, subTodoText);
      setSubTodoText("");
    } else {
      setAlertText("Please type some Sub Todo!");
      const timeout = setTimeout(() => {
        setAlertText("");
        clearTimeout(timeout);
      }, 3000);
    }
  };

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
          {!isSubTodo && (
            <div>
              <Button
                icon={arrowIcon}
                className="hover:bg-transparent active:bg-transparent"
                variant="borderless"
                title="Add sub todo"
                onClick={expandClickHandler}
              />
            </div>
          )}
        </div>
      </div>
      {subTodos &&
        subTodos?.map((subTodo: ITodo) => {
          return (
            <div key={subTodo._id} className="p-3">
              <TodoItem todo={subTodo} isSubTodo />
            </div>
          );
        })}
      {isExpanded && (
        <div className="flex items-center gap-3 px-2 py-3 mx-8">
          <MdKeyboardArrowRight size="1.5rem" />

          <input
            type="text"
            className="bg-stone-800 border border-stone-300 rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2"
            placeholder="Add sub todo to your Todo."
            value={subTodoText}
            onChange={(e) => setSubTodoText(e.target.value)}
          />

          <Button
            variant="borderless"
            icon={<AiOutlinePlus size="1.3rem" />}
            onClick={addSubTodoClickHandler}
          />
        </div>
      )}
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
