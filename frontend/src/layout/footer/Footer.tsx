import React from 'react';
import { Col, Layout, Row } from 'antd';
import { FooterWrapper } from './footer.style';

const { Footer: FooterAntd } = Layout;

function Footer() {
  return (
    <FooterAntd
      style={{
        background: '#001529',
      }}
    >
      <FooterWrapper>
        <Row justify="center">
          <Col span={4}>
            <a href="/">
              <p>GROUP D</p>
            </a>
            <a href="https://github.com/nguyenthengocit37">
              <p>Nguyễn Thế Ngọc</p>
            </a>
            <a href="https://github.com/trungnhan03">
              <p>Đào Trung Nhân</p>
            </a>
            <a href="https://github.com/cuongp948">
              <p>Phạm Hùng Cường</p>
            </a>
          </Col>
          <Col span={4}>
            <a href="/">
              <p>All Jobs</p>
            </a>
            <a href='#'>
              <p>About Us</p>
            </a>
            <a href="#">
              <p>Contact Us</p>
            </a>
            <a href="#">
              <p>FAQ</p>
            </a>
          </Col>
          <Col span={4}>
            <a href="#">
              <p>FAQ</p>
            </a>
            <a href="#">
              <p>Terms & Conditions</p>
            </a>
            <a href="#">
              <p>Privacy Policy</p>
            </a>
            <a href="#">
              <p>Operating Regulation</p>
            </a>
          </Col>
          <Col span={4}>
            <p>Copyright © GroupD-CDPTW2-2022</p>
            <p>Tax code: 123456789</p>
          </Col>
        </Row>
      </FooterWrapper>
    </FooterAntd>
  );
}

export default Footer;
