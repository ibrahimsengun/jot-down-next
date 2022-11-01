import React from "react";
import { ITodoCategory } from "../../models/Todo";
import AddCategoryField from "../AddCategoryField";

interface ICategoryBadge {
  category: ITodoCategory;
  isAddingCategory: boolean;
}

const CategoryBadge: React.FC<ICategoryBadge> = ({
  category,
  isAddingCategory,
}) => {
  const { _id, name, color } = category;

  return (
    <div>
      {isAddingCategory && (
        <div>
          <AddCategoryField />
        </div>
      )}
      <div
        className={`border p-0.5 text-sm rounded-sm `}
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </div>
  );
};

export default CategoryBadge;
