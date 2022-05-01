import { AppProps, NextWebVitalsMetric } from "next/app";
import "@styles/normalize.css";
import "@styles/layout.css";
import "@styles/commons.css";
import "@styles/disclaimer.css";

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  console.log(metric);
}

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;
  return (
    <div className="standard">
      <div className="wrapper">
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default App;
