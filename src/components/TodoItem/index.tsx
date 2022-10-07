import React, { useState } from "react";
import { BsCheckCircle, BsTrash } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import Button from "../Button";
import { useTodo } from "../../context/TodoContext";
import { ITodo } from "../../models/Todo";

interface ITodoItem {
  todo: ITodo;
}

const TodoItem: React.FC<ITodoItem> = ({ todo }) => {
  const { id, text, isCompleted } = todo;

  const { completeTodo, editTodo, removeTodo } = useTodo();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodoText, setEditTodoText] = useState<string>(text);

  const [alertText, setAlertText] = useState<string>("");

  const editTodoChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    setEditTodoText(event.currentTarget.value);
  };

  const editTodoHandler = () => {
    if (editTodoText.length > 0) {
      editTodo(id, editTodoText);
      setIsEdit(false);
    } else {
      setAlertText("Please type new Todo.");
      const timeout = setTimeout(() => {
        setAlertText("");
        clearTimeout(timeout);
      }, 3000);
    }
  };

  return (
    <div className="border px-3 py-3 rounded-xl">
      <div className="flex items-center">
        {isEdit ? (
          <>
            <input
              className="bg-slate-800 border px-2 border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-auto mr-2"
              type="text"
              value={editTodoText}
              onChange={editTodoChangeHandler}
            />
            <Button
              icon={<AiOutlineSave size="1.3rem" />}
              className="mr-2"
              variant="borderless"
              onClick={editTodoHandler}
              title="Save"
            />
            {alertText && (
              <span className="animate-bounce pt-2">{alertText}</span>
            )}
          </>
        ) : (
          <div
            className={`${isCompleted ? " line-through text-slate-500" : ""}`}
          >
            {text}
          </div>
        )}

        <div className="flex order-2 justify-end ml-auto">
          {!isCompleted && (
            <>
              <div>
                <Button
                  icon={<AiOutlineEdit size="1.3rem" />}
                  className="ml-2"
                  variant="borderless"
                  onClick={() => setIsEdit((prev) => !prev)}
                  title="Edit"
                />
              </div>
              <div>
                <Button
                  icon={<BsCheckCircle size="1.3rem" />}
                  className="ml-2"
                  variant="borderless"
                  onClick={() => completeTodo(id)}
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
              onClick={() => removeTodo(id)}
              title="Delete"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
