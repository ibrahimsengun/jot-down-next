export interface ITodo {
  _id?: string;
  text: string;
  isCompleted: boolean;
  subTodos?: ISubTodo[];
  category?: string;
}

export interface ISubTodo {
  _id?: string;
  parentId: string;
  text: string;
  isCompleted: boolean;
}
