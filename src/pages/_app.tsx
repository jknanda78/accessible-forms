import { AppProps } from "next/app";
import "@styles/commons.css";

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;
  return (
    <Component {...pageProps} />
  );
};

export default App;
