import React, { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { useTodo } from "../../context/TodoContext";
import Button from "../Button";

const AddTodo: React.FC = () => {
  const { addTodo } = useTodo();

  const [addTodoText, setAddTodoText] = useState<string>("");
  const [alertText, setAlertText] = useState<string>("");

  const changeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    setAddTodoText(event.currentTarget.value);
  };

  const clickHandler = (event: React.MouseEvent): void => {
    if (addTodoText.length > 0) {
      addTodo(addTodoText);
      setAddTodoText("");
      setAlertText("");
    } else {
      setAlertText("Please type some Todo.");
      const timeout = setTimeout(() => {
        setAlertText("");
        clearTimeout(timeout);
      }, 3000);
    }
  };

  return (
    <div className="grid justify-items-stretch py-5 gap-2 px-44">
      <div>
        <h2 className="text-center mb-2 font-bold">Add Todo</h2>
      </div>
      <input
        className="bg-stone-800 border border-stone-300 rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 mb-5"
        type="text"
        id="addTodo"
        value={addTodoText}
        placeholder="Type some Todo!"
        onChange={changeHandler}
      />

      <div className="justify-self-end">
        <Button
          icon={<BsPlusCircleFill />}
          iconRight
          text="Add"
          className="bg-stone-800 outline outline-1 focus:border-stone-500 py-1"
          onClick={clickHandler}
          title="Add Todo"
        />
      </div>
      {alertText && (
        <div className="justify-self-center  animate-bounce absolute">
          <span className="relative top-32 bg-gray-800 w-fit p-3 rounded-lg">
            {alertText}
          </span>
        </div>
      )}
    </div>
  );
};

export default AddTodo;
