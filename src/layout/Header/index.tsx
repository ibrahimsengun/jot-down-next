import React from "react";
import { BiNote } from "react-icons/bi";
import { useTodo } from "../../context/TodoContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Header: React.FC = () => {
  const { isLoading } = useTodo();
  return (
    <div className="border-b-2 border-stone-500 p-5 w-full">
      <div className="flex flex-row justify-between items-center px-5">
        <div className="flex flex-row gap-5 items-center">
          <BiNote size="3rem" />
          <h1>Jot-Down</h1>
        </div>
        {isLoading && (
          <div className="animate-spin">
            <AiOutlineLoading3Quarters
              size={"2rem"}
              className="text-teal-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
