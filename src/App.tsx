import React, {Suspense, useEffect, useState} from 'react';
import {Provider, useDispatch} from "react-redux";
import {BrowserRouter as Router,} from "react-router-dom";
import {useTranslation} from "react-i18next";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";

import store from "./store/store";
import Keys from './constants/appKeys';
import Main from "./routes/Main";

import './App.css';

const App: React.FC = () => {
  const [fetching, setFetching] = useState(true);

  return (
    <Main/>
  );
};

const AppWrapper: React.FC = () => {
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/config.json`, {
      headers: {
        'pragma': 'no-cache',
        'cache-control': 'no-cache'
      },
      cache: "no-cache"
    })
      .then((response) => response.json())
      .then((response: any) => {
        let res: any = {...response};
        if (typeof res === 'object') {

          Object.keys(res).forEach((key: string) => {
            if (key) {
              //@ts-ignore
              Keys[key] = res[key];
            }
          })
        }
      })
      .finally(() => {
        // getting the localized text by url
        // obtained from config.js, since the
        // locale.ts file is initialized faster
        // than the server will return a response
        setFetching(false);
      })
  }, []);

  return (
    fetching
      ? null
      :
      <Suspense fallback="loading">
        <ErrorBoundary>
          <Router>
            <Provider store={store}>
              <App/>
            </Provider>
          </Router>
        </ErrorBoundary>
      </Suspense>
  );
}

export default AppWrapper;
