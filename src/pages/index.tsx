import type { NextPage } from "next";
import Head from "next/head";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import React, { useId } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Layout from "../layout";

const Home: NextPage = () => {
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
            <div className="grid grid-cols-2 gap-3">
              <div className="row-start-auto">
                <AddTodo />
              </div>
              <div className="row-end-auto">
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
