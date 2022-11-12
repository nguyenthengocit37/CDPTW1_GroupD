import React from 'react';
import { Layout } from 'antd';
import { FooterWrapper } from './footer.style';

const { Footer: FooterAntd } = Layout;

function Footer() {
  return (
    <FooterAntd style={{ background: 'black' }}>
      <FooterWrapper>Footer</FooterWrapper>
    </FooterAntd>
  );
}

export default Footer;
