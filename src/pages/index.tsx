import type { NextPage } from "next";
import Head from "next/head";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import React, { useId } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Layout from "../layout";

const Home: NextPage = () => {
  const id = useId();

  console.log(id);

  return (
    <>
      <Head>
        <title>Jot Down</title>
        <meta name="description" content="Take some 'jots'" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main>
          <div className="container mx-auto pt-10">
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
      </Layout>
    </>
  );
};

export default Home;
