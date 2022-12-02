import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Layout, Select } from 'antd';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import { HeaderWrapper, MenuWrapper } from './header.style';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSkills } from '../../services/api/skill/skillApi';
import { getCities } from '../../services/api/city/cityApi';
import { SearchOutlined } from '@ant-design/icons';

const { Header: HeaderAntd } = Layout;
const { Option } = Select;
function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState(Object.fromEntries(searchParams.entries()));
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: skills } = useQuery(['skills'], () => {
    return getSkills();
  });
  const { isLoading: isCitiesLoading, data: cities } = useQuery(['cities'], () => {
    return getCities();
  });
  const handleNavigate = () => {
    navigate({
      pathname: '/',
      search: 'city=all&skill=all&keyword=',
    });
  };
  const onFinish = (values: any) => {
    const { job: keyword = '', city = '' } = values;
    navigate({
      pathname: '/',
      search: `keyword=${keyword}&city=${city}&skill=`,
    });
  };
  useEffect(() => {
    setQueryParams(Object.fromEntries(searchParams.entries()));
  }, [searchParams]);
  return (
    <HeaderAntd>
      <HeaderWrapper>
        <a onClick={handleNavigate}>IT CAREER</a>
        <MenuWrapper>
          <Menu menuButton={<MenuButton>All Jobs</MenuButton>} arrow>
            <SubMenu label="Job By Skill" arrow align="start" overflow="auto">
              {skills &&
                skills.length > 0 &&
                skills.map((skill) => (
                  <MenuItem
                    key={skill.name}
                    onClick={() => setSearchParams({ ...queryParams, skill: skill.name })}
                  >
                    {skill.name}
                  </MenuItem>
                ))}
            </SubMenu>
            <SubMenu label="Job By City" arrow align="start" overflow="auto">
              <MenuItem onClick={() => setSearchParams({ ...queryParams, city: 'all' })}>
                All cities
              </MenuItem>
              {cities &&
                cities.length > 0 &&
                cities.map((city) => (
                  <MenuItem
                    key={city.name}
                    onClick={() => setSearchParams({ ...searchParams, city: city.name })}
                  >
                    {city.name}
                  </MenuItem>
                ))}
            </SubMenu>
          </Menu>
        </MenuWrapper>
        {location.pathname !== '/' && (
          <Form
            form={form}
            name="horizontal_login"
            layout="inline"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 'auto',
            }}
            onFinish={onFinish}
          >
            <Form.Item name="job">
              <Input placeholder="Keyword job..." size="large" style={{ width: '400px' }} />
            </Form.Item>
            <Form.Item name="city">
              <Select
                placeholder="Select a option and change input text above"
                style={{ width: 150 }}
                size="large"
                className="citySelect"
                loading={isCitiesLoading}
                defaultValue="all"
              >
                <Option value="all">All cities</Option>
                {!isCitiesLoading &&
                  cities &&
                  cities.length > 0 &&
                  cities.map((city) => (
                    <Option key={city.name} value={city.name}>
                      {city.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Button type="primary" icon={<SearchOutlined />} size="large" htmlType="submit">
              Search
            </Button>
          </Form>
        )}
      </HeaderWrapper>
    </HeaderAntd>
  );
}

export default Header;
