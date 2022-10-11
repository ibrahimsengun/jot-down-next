import React, { useState } from "react";
import { BsCheckCircle, BsTrash } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Button from "../Button";
import { useTodo } from "../../context/TodoContext";
import { ITodo } from "../../models/Todo";

interface ITodoItem {
  todo: ITodo;
}

const TodoItem: React.FC<ITodoItem> = ({ todo }) => {
  const { _id, title, description, isCompleted } = todo;
  const { completeTodo, removeTodo } = useTodo();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const arrowIcon = isExpanded ? (
    <MdKeyboardArrowUp size="1.5rem" />
  ) : (
    <MdKeyboardArrowDown size="1.5rem" />
  );

  const expandClickHandler = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`${
        isCompleted ? "todo-item-completed" : "todo-item-notcompleted"
      }`}
    >
      <div className="flex items-center">
        <div className="flex flex-col gap-3">
          <div
            className={`text-lg font-bold ${
              isCompleted ? " line-through text-stone-500" : ""
            }`}
          >
            {title}
          </div>
          {description && <div className="pl-3">{description}</div>}
        </div>

        <div className="flex order-2 justify-end ml-auto">
          {!isCompleted && (
            <>
              <div>
                <Button
                  icon={<BsCheckCircle size="1.3rem" />}
                  className="ml-2"
                  variant="borderless"
                  onClick={() => completeTodo(_id)}
                  title="Check"
                />
              </div>
            </>
          )}

          <div>
            <Button
              icon={<BsTrash size="1.3rem" />}
              className="ml-2"
              variant="borderless"
              onClick={() => removeTodo(_id)}
              title="Delete"
            />
          </div>
          <div>
            <Button
              icon={arrowIcon}
              className="ml-2 hover:bg-transparent active:bg-transparent"
              variant="borderless"
              title="Description"
              onClick={() => setIsExpanded((prev) => !prev)}
            />
          </div>
        </div>
      </div>
      {isExpanded && <div className="px-2 py-3">{description}</div>}
    </div>
  );
};

export default TodoItem;
