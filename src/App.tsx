import React from 'react';
import { Routes, Route } from "react-router-dom";
import {Layout} from "antd";
import Cryptocurrencies from "./screens/cryptocurrencies";
import Markets from "./screens/markets";
import HeaderBar from "./components/header/header";
import Exchanges from "./screens/exchanges";
import Overview from "./screens/overview";
import './App.less';

const {Content} = Layout
function App() {
    const { innerWidth: width, innerHeight: height } = window;
  return (
      <Layout className="App" style={{height: height}}>
          <HeaderBar />
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
              <Routes>
                  <Route path="/" element={<Overview />} />
                  <Route path="cryptocurrencies" element={<Cryptocurrencies />} />
                  <Route path="exchanges" element={<Exchanges />} />
                  <Route path="markets" element={<Markets />} />
              </Routes>
          </Content>
      </Layout>
  );
}

export default App;
