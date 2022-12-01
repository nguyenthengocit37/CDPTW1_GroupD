import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  color: #fff;
  font-size: 24px;
  display: flex;
  gap:50px;
  padding: 0 50px;
  & a {
    color: #fff;
  }
`;
export const MenuWrapper = styled.div`
  font-size: initial;
  & button{
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  & button:hover {
    color: #ea1e30;
  }
  & ul li{
    line-height: initial;
  }
`
