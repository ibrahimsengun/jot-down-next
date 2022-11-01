import React from "react";

const AddCategoryField = () => {
  return (
    <div className="relative top-10">
      <div className="absolute p-5 bg-stone-900 border border-stone-400">
        <input
          type="text"
          className="bg-stone-700 border border-stone-700 rounded-sm focus:ring-stone-500 focus:border-stone-500 block px-1"
          autoFocus
        />
        {}
      </div>
    </div>
  );
};

export default AddCategoryField;
