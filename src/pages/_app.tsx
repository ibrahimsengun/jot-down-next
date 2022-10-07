import "../../styles/globals.css";
import type { AppProps } from "next/app";
import App from "next/app";
import { TodoContextProvider } from "../context/TodoContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TodoContextProvider>
      <Component {...pageProps} />
    </TodoContextProvider>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
