import React from "react";
import { BiNote } from "react-icons/bi";

const Header: React.FC = () => {
  return (
    <div className="border-b-2 border-stone-500 p-5 w-full">
      <div className="flex flex-row px-5">
        <div className="flex flex-row gap-5 items-center">
          <BiNote size="3rem" />
          <h1>Jot-Down</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
