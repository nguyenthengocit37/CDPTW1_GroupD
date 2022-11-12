import React from 'react';
import { Layout } from 'antd';
import { HeaderWrapper } from './header.style';
import { Link } from 'react-router-dom';
const { Header: HeaderAntd } = Layout;
function Header() {
  return (
    <HeaderAntd>
      <HeaderWrapper>
        <Link to={'/'}>IT CAREER</Link>
      </HeaderWrapper>
    </HeaderAntd>
  );
}

export default Header;
