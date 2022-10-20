import React, {Suspense, useEffect, useState} from 'react';
import {Provider} from "react-redux";
import {HashRouter as Router} from "react-router-dom";

import store from "store/store";
import Keys from 'constants/appKeys';
import Main from "routes/Main";

import "./App.less";

const App: React.FC = () => {
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
      .then((response: {[key: string]: string}) => {
        let res = {...response};
        if (typeof res === 'object') {
          (Object.keys(res) as Array<keyof typeof Keys>)
          .forEach((key) => {
            if (key) {
              Keys[key] = res[key];
            }
          })
        }
      })
      .finally(() => {
        // obtained from config.js, since the
        // than the server will return a response
        setFetching(false);
      })
  }, []);

  return (
    fetching
      ? null
      :
      <Suspense fallback="loading">
        <Router>
          <Provider store={store}>
            <Main />
          </Provider>
        </Router>
      </Suspense>
  );
}

export default App;
