export interface ITodo {
  _id?: string;
  text: string;
  isCompleted: boolean;
  subTodos?: ISubTodo[];
  category?: ITodoCategory;
}

export interface ISubTodo {
  _id?: string;
  parentId: string;
  text: string;
  isCompleted: boolean;
}

export interface ITodoCategory {
  _id?: string;
  name: string;
  color: string;
}
