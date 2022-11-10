import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import Footer from './footer/Footer';
import Header from './header/Header';
const { Content } = Layout;

function MainLayout() {
  return (
    <>
      <Layout>
        <Header />
        <Content>
          <div className="contarner">
            <Outlet />
          </div>
        </Content>
        <Footer />
      </Layout>
      {/* <Header />

      <Footer /> */}
    </>
  );
}

export default MainLayout;
