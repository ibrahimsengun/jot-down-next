import React from "react";
import { BiNote } from "react-icons/bi";

const Header: React.FC = () => {
  return (
    <div className="border-b p-3 sticky top-0 z-40 w-full backdrop-blur">
      <div className="flex flex-row items-end justify-end gap-3 px-5">
        <div className="flex flex-row gap-3 items-center">
          <BiNote size="3rem" />
          <h1>Jot-Down</h1>
        </div>
        <div className="flex flex-row gap-3 order-2 ml-auto">
          <div>Navbar</div>
          <div>Navbar</div>
          <div>Navbar</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
