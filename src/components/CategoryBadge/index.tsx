import React from "react";
import { ITodoCategory } from "../../models/Todo";

interface ICategoryBadge {
  category: ITodoCategory;
}

const CategoryBadge: React.FC<ICategoryBadge> = ({ category }) => {
  const { _id, name, color } = category;

  return (
    <div className={`border p-0.5 text-sm rounded-sm ${color == 'sky' && 'bg-sky-700'}`}>{name}</div>
  );
};

export default CategoryBadge;
