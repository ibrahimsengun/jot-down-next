import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { ITodo } from "../models/Todo";

const firebaseConfig = {
  apiKey: "AIzaSyDJidT1rWZwDjGMQNeoUNrdiOnQXp3DY2g",
  authDomain: "jot-down-e2751.firebaseapp.com",
  projectId: "jot-down-e2751",
  storageBucket: "jot-down-e2751.appspot.com",
  messagingSenderId: "627583354291",
  appId: "1:627583354291:web:ba678bad10f7026d05b7c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

export const getAllTodos = async (): Promise<ITodo[]> => {
  const data: ITodo[] = [];

  const q = query(collection(database, "todos"), orderBy('date', 'desc'));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());

    const todo: ITodo = {
      id: doc.id,
      text: doc.data().text,
      isCompleted: doc.data().isCompleted,
      date: doc.data().date,
    };
    data.push(todo);
  });

  return data;
};

export const addTodo = async (text: string) => {
  await addDoc(collection(database, "todos"), {
    text: text,
    isCompleted: false,
    date: new Date().toLocaleString(),
  });
};

export const removeTodo = async (id: string) => {
  await deleteDoc(doc(database, "todos", id));
};

export const completeTodo = async (id: string) => {
  const todoRef = doc(database, "todos", id);
  await updateDoc(todoRef, {
    isCompleted: true,
  });
};

export const editTodo = async (id: string, text: string) => {
  const todoRef = doc(database, "todos", id);
  await updateDoc(todoRef, {
    text: text,
  });
};
