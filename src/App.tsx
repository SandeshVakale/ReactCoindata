import React from 'react';
import { Routes, Route } from "react-router-dom";
import {Layout} from "antd";
import Cryptocurrencies from "./screens/cryptocurrencies";
import Markets from "./screens/markets";
import HeaderBar from "./components/header/header";
import Exchanges from "./screens/exchanges";
import Overview from "./screens/overview";
import './App.less';
import {useViewportHeight} from "./hooks";

const {Content} = Layout
function App() {
  const {height} = useViewportHeight();

  console.log(height);
  return (
      <Layout className="App" >
          <HeaderBar />
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, marginBottom: 40 }}>
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
