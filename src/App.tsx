import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

import store from "@Store/store";
import Main from "@Routes/Main";

import "./App.less";

const App: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <Main />
      </Provider>
    </Router>
  );
}

export default App;
