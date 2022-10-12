export interface ITodo {
  _id?: string;
  title: string;
  isCompleted: boolean;
  subTodos?: ITodo[];
  category?: string;
}
