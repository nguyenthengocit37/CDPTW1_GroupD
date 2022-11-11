import React from 'react';
import { Layout, Menu } from 'antd';
import { HeaderWrapper } from './header.style';
const { Header: HeaderAntd } = Layout;
function Header() {
  return (
    <HeaderAntd>
      <HeaderWrapper>IT CAREER</HeaderWrapper>
    </HeaderAntd>
  );
}

export default Header;
