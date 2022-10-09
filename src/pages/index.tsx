import type { NextPage } from "next";
import Head from "next/head";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useTodo } from "../context/TodoContext";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const Home: NextPage = () => {
  const { isLoading } = useTodo();

  return (
    <div>
      <Head>
        <title>Jot Down</title>
        <meta name="description" content="Take some 'jots'" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <div className="container mx-auto pt-10 px-44">
          <div className="grid grid-cols-1 gap-3">
            <div className="row-start-12">
              <AddTodo />
            </div>
            <div className="row-start-12">
              <TodoList />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
