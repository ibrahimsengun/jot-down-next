import type { NextPage } from "next";
import Head from "next/head";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useTodo } from "../context/TodoContext";

const Home: NextPage = () => {
  const { isLoading } = useTodo();

  return (
    <div>
      <Head>
        <title>Jot Down</title>
        <meta name="description" content="Take some 'jots'" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AddTodo />
        <TodoList />
      </main>
    </div>
  );
};

export default Home;
