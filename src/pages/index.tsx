import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import axios from "axios";

interface ITodoMongo {
  _id: string;
  id: string;
  text: string;
  isCompleted: boolean;
}

interface IHome {
  todos: ITodoMongo[];
}

interface IMongo<T> {
  documents: T[];
}

const Home: NextPage<IHome> = ({ todos }) => {
  console.log(todos);

  return (
    <div className={styles.container}>
      <Head>
        <title>Jot Down</title>
        <meta name="description" content="Take some 'jots'" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}></main>
    </div>
  );
};

Home.getInitialProps = async () => {
  const data = await axios
    .get<IMongo<ITodoMongo>>("http://localhost:3000/api/deneme")
    .then((res) => {
      return res.data?.documents;
    });

  return {
    todos: data,
  };
};

export default Home;
