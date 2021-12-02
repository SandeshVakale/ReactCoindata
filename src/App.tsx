import React from 'react';
import { Counter } from './features/counter/Counter';
import { Routes, Route, Link } from "react-router-dom";
import {Layout} from "antd";
import Cryptocurrencies from "./screens/cryptocurrencies";
import Markets from "./screens/markets";
import HeaderBar from "./components/header/header";
import Exchanges from "./screens/exchanges";
import './App.less';

const {Content} = Layout
function App() {
  return (
      <Layout className="App">
          <HeaderBar />
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
              <Routes>
                  <Route path="overview" element={<Counter />} />
                  <Route path="cryptocurrencies" element={<Cryptocurrencies />} />
                  <Route path="exchanges" element={<Exchanges />} />
                  <Route path="markets" element={<Markets />} />
              </Routes>
          </Content>
      </Layout>
  );
}

export default App;
