import React, { useState } from "react";
import { BsCheckCircle, BsCircle, BsTag, BsTrash } from "react-icons/bs";
import { useTodo } from "../../context/TodoContext";
import { ITodoCategory } from "../../models/Todo";
import Button from "../Button";
import CategoryBadge from "../CategoryBadge";

interface IActionButtons {
  _id?: string;
  category?: ITodoCategory;
  isCompleted: boolean;
}

const ActionButtons: React.FC<IActionButtons> = ({
  _id,
  category,
  isCompleted,
}) => {
  const { completeTodo, removeTodo } = useTodo();

  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);

  return (
    <div className="flex order-2 justify-end ml-auto">
      <div className="flex gap-3">
        {category && (
          <CategoryBadge
            category={category}
            isAddingCategory={isAddingCategory}
          />
        )}
        <Button
          icon={<BsTag size="1.3rem" className="hover:text-sky-500" />}
          variant="borderless"
          onClick={() => setIsAddingCategory((prev) => !prev)}
        />
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
          icon={<BsTrash size="1.3rem" className="hover:text-red-600" />}
          variant="borderless"
          onClick={() => removeTodo(_id)}
          title="Delete"
        />
      </div>
    </div>
  );
};

export default ActionButtons;
