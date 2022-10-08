import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { IMongoResponse } from "../models/mongo";
import { ITodo } from "../models/Todo";

interface IHomePage {
  todos: ITodo[];
}

const Home: NextPage<IHomePage> = ({ todos }) => {
  const [todo, setTodo] = useState<ITodo[]>([]);

  useEffect(() => {
    const getData = async () => {
      const allTodos = await axios
        .get("http://localhost:3000/api/todos/allTodos")
        .then((response) => {
          return response.data;
        });

      setTodo(allTodos);
    };

    getData();
  }, []);

  return (
    <div>
      <Head>
        <title>Jot Down</title>
        <meta name="description" content="Take some 'jots'" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ol>
        {todo.map((item) => {
          return <li key={item._id}>{item.text}</li>;
        })}
      </ol>
    </div>
  );
};

Home.getInitialProps = async (context) => {
  const allTodos = await axios
    .get("http://localhost:3000/api/todos/allTodos")
    .then((response) => {
      return response.data;
    });

  return { todos: allTodos };
};

export default Home;
