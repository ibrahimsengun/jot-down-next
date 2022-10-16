import React, { useState, useRef, useEffect } from "react";
import {
  BsTrash,
  BsCircle,
  BsCheckCircle,
  BsPlus,
  BsPlusCircle,
  BsFillCaretDownFill,
  BsFillCaretRightFill,
} from "react-icons/bs";
import Button from "../Button";
import { useTodo } from "../../context/TodoContext";
import { ISubTodo, ITodo } from "../../models/Todo";
import uniqid from "uniqid";

interface ITodoItem {
  todo: ITodo;
  onClick: () => void;
}

const TodoItem: React.FC<ITodoItem> = ({ todo, onClick }) => {
  const { _id, text, isCompleted, subTodos } = todo;
  const { completeTodo, removeTodo, addSubTodo, selectedTodo } = useTodo();

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isSelectedTodo, setIsSelectedTodo] = useState<boolean>(
    selectedTodo?._id === _id
  );

  const [subTodoText, setSubTodoText] = useState<string>();

  const arrowIcon = isExpanded ? (
    <BsFillCaretDownFill size="0.7rem" />
  ) : (
    <BsFillCaretRightFill size="0.7rem" />
  );

  useEffect(() => {
    setIsSelectedTodo(selectedTodo?._id === _id);
    setIsHovered(false);

    return () => setIsAdding(false);
  }, [_id, selectedTodo?._id]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(isSelectedTodo ? true : false)}
    >
      <div
        className={`${
          isCompleted ? "todo-item-completed" : "todo-item-notcompleted"
        } ${isSelectedTodo && "todo-item-selected"}`}
      >
        <div className="flex items-center">
          {subTodos && subTodos?.length > 0 && (
            <div>
              <Button
                icon={arrowIcon}
                variant="borderless"
                onClick={() => setIsExpanded((prev) => !prev)}
              />
            </div>
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

          {(isHovered || isSelectedTodo) && (
            <div className="flex order-2 justify-end ml-auto">
              <div>
                {!isCompleted && (
                  <Button
                    icon={<BsCircle size="1.3rem" />}
                    hoveredIcon={
                      <BsCheckCircle size="1.3rem" className="text-teal-500" />
                    }
                    variant="borderless"
                    onClick={() => completeTodo(_id)}
                    title="Check"
                  />
                )}
                <Button
                  icon={
                    <BsTrash size="1.3rem" className="hover:text-red-600" />
                  }
                  className="ml-2"
                  variant="borderless"
                  onClick={() => removeTodo(_id)}
                  title="Delete"
                />
              </div>
            </div>
          )}
        </div>
        {isExpanded && (
          <div className="px-12 flex flex-col gap-1 mt-4">
            {subTodos?.map((item: ISubTodo) => {
              return (
                <div key={item._id} className="border border-stone-500 rounded-sm px-1">
                  {item.text}
                </div>
              );
            })}
          </div>
        )}

        {(isHovered || isSelectedTodo) && isAdding && (
          <div className="px-1 mt-2">
            <input
              className="bg-stone-700 border border-stone-700 rounded-sm focus:ring-stone-500 focus:border-stone-500 block w-full px-1"
              type="text"
              value={subTodoText}
              placeholder="Type some Sub Todo!"
              onChange={(e) => setSubTodoText(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                addSubTodo(
                  _id,
                  {
                    _id: uniqid(),
                    parentId: _id,
                    isCompleted: false,
                    text: subTodoText,
                  } as ISubTodo,
                  selectedTodo?.subTodos ?? undefined
                )
              }
            />
          </div>
        )}
      </div>
      {(isHovered || isSelectedTodo) && !isAdding && (
        <div className="relative">
          <span
            className={`absolute ${
              isExpanded ? "bottom-[55px]" : "-top-[33px]"
            } -right-10`}
          >
            <Button
              icon={<BsPlus size="1.5rem" className="text-stone-400" />}
              hoveredIcon={
                <BsPlusCircle size="1.5rem" className="text-stone-300" />
              }
              variant="borderless"
              title="Add sub todo"
              onClick={() => {
                setIsAdding(true);
              }}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
