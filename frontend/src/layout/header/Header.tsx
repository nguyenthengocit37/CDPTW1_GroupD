import React from 'react';
import { Layout } from 'antd';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import { HeaderWrapper, MenuWrapper } from './header.style';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSkills } from '../../services/api/skill/skillApi';
const { Header: HeaderAntd } = Layout;
function Header() {
  const { data: skills } = useQuery(['skills'], () => {
    return getSkills();
  });
  return (
    <HeaderAntd>
      <HeaderWrapper>
        <Link to={'/'}>IT CAREER</Link>
        <MenuWrapper>
          <Menu menuButton={<MenuButton>All Jobs</MenuButton>} arrow>
            <SubMenu label="Job By Skill" arrow align='start' overflow='auto'>
              {skills &&
                skills.length > 0 &&
                skills.map((skill) => <MenuItem>{skill.name}</MenuItem>)}
            </SubMenu>
          </Menu>
        </MenuWrapper>
      </HeaderWrapper>
    </HeaderAntd>
  );
}

export default Header;
