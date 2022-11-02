import "../../styles/globals.css";
import type { AppProps } from "next/app";
import App from "next/app";
import { TodoContextProvider } from "../context/TodoContext";
import { CategoryContextProvider } from "../context/CategoryContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TodoContextProvider>
      <CategoryContextProvider>
        <Component {...pageProps} />
      </CategoryContextProvider>
    </TodoContextProvider>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
