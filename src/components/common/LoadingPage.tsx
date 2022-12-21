import * as React from "react";
import {Spin} from "antd";

import BackGroundImage from "@Assets/images/BackGround.svg";
import logo from "@Assets/images/logo.png";

import './common.css';

const LoadingPage: React.FC = () => {

  return (
      <Spin size="large">
        <div className="main-page-wrapper">
          <img alt="Logo" src={logo} className="main-page-logo"/>
          <img alt="BackGround" className="bg-image" src={BackGroundImage}/>
          <h4>DASHBOARD</h4>
        </div>
      </Spin>
    )
};

export default LoadingPage;
