import React, { useMemo, useState } from 'react';
import { Menu, Checkbox, Slider, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { VideoCameraOutlined, SearchOutlined, ClockCircleOutlined } from '@ant-design/icons';
import genres from '../database/genres';
import styled from 'styled-components';

type Props = {
  numberOfMovies: number;
  filterByGenre: (inp: CheckboxValueType[]) => void;
  filterByKeyword: (text: string) => void;
  filterByYear: ([min, max]: [number, number]) => void;
  yearRange: [number, number];
};

export default function SideMenu(props: Props) {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState<CheckboxValueType[]>(genres);
  const [selectAll, setSelectAll] = useState(true);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedYearRange, setSelectedYearRange] = useState(props.yearRange);
  const [searchString, setSearchString] = useState('');

  //Tooltip marks of year slider (UNIMPORTANT)
  const yearSliderMarks = useMemo(() => calcYearSliderMarks(props.yearRange), [props.yearRange]);

  function onGenreSelectionChange(e: CheckboxValueType[]) {
    setSelectedGenres(e);
    setIndeterminate(e.length < genres.length);
    setSelectAll(e.length === genres.length);
    props.filterByGenre(e);
  }

  function onSelectAllChange(e: CheckboxChangeEvent) {
    setSelectedGenres(e.target.checked ? genres : []);
    setIndeterminate(false);
    setSelectAll(e.target.checked);
    props.filterByGenre(e.target.checked ? genres : []);
  }

  return (
    <Container
      collapsed={collapsed}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      onClick={() => setCollapsed(false)}>
      <MyMenu mode='inline' theme='dark' inlineCollapsed={collapsed}>
        {/* Genre Filtering */}
        <Menu.SubMenu key='genre' icon={<VideoCameraOutlined />} title='Filter by genre'>
          <Menu.Item key='0'>
            <Checkbox
              indeterminate={indeterminate}
              onChange={(e) => onSelectAllChange(e)}
              checked={selectAll}>
              Check all
            </Checkbox>
          </Menu.Item>
          <Menu.Item key='1' style={{ height: 'fit-content', backgroundColor: '#000c17' }}>
            <Checkbox.Group
              style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
              options={genres}
              value={selectedGenres}
              onChange={(e) => onGenreSelectionChange(e)}
            />
          </Menu.Item>
        </Menu.SubMenu>

        {/* Keyword Filtering */}
        <Menu.SubMenu key='keyword' icon={<SearchOutlined />} title='Filter by keyword'>
          <Menu.Item key='keyword-item' style={{ padding: '0 5px', backgroundColor: '#000c17' }}>
            <Input
              style={{ width: '100%', marginLeft: '2px' }}
              size='large'
              placeholder='enter a keyword...'
              allowClear
              bordered
              prefix={<SearchOutlined style={{ color: 'black' }} />}
              value={searchString}
              onChange={(e) => {
                props.filterByKeyword(e.target.value);
                setSearchString(e.target.value);
              }}
            />
          </Menu.Item>
        </Menu.SubMenu>

        {/* Year Filtering */}
        <Menu.SubMenu key='year' icon={<ClockCircleOutlined />} title='Filter by year'>
          <Menu.Item
            key='year-item'
            style={{ padding: '0 5px', display: 'flex', alignItems: 'flex-end', height: '60px' }}>
            <Slider
              style={{ width: '85%', marginLeft: '7.5%' }}
              range={{ draggableTrack: false }}
              marks={yearSliderMarks}
              max={props.yearRange[1]}
              min={props.yearRange[0]}
              defaultValue={selectedYearRange}
              onAfterChange={(range: [number, number]) => {
                props.filterByYear(range);
                setSelectedYearRange(range);
              }}
            />
          </Menu.Item>
        </Menu.SubMenu>

        {/* Number of movies remaining after filters */}
        <Menu.Item key='count' style={{ opacity: collapsed ? 0 : 1 }}>
          <p>{`Now showing: ${props.numberOfMovies} movies`}</p>
        </Menu.Item>
      </MyMenu>
    </Container>
  );
}

const calcYearSliderMarks = (yearRange: [number, number]) => ({
  [yearRange[0]]: { label: yearRange[0].toString(), style: { color: 'white' } },
  [yearRange[0] + Math.floor((yearRange[1] - yearRange[0]) / 4)]: {
    label: (yearRange[0] + Math.floor((yearRange[1] - yearRange[0]) / 4)).toString(),
    style: { color: 'white' },
  },
  [yearRange[0] + Math.floor((yearRange[1] - yearRange[0]) / 2)]: {
    label: (yearRange[0] + Math.floor((yearRange[1] - yearRange[0]) / 2)).toString(),
    style: { color: 'white' },
  },
  [yearRange[0] + Math.floor((3 * (yearRange[1] - yearRange[0])) / 4)]: {
    label: (yearRange[0] + Math.floor((3 * (yearRange[1] - yearRange[0])) / 4)).toString(),
    style: { color: 'white' },
  },
  [yearRange[1]]: { label: yearRange[1].toString(), style: { color: 'white' } },
});

const Container = styled.div`
  width: ${(props: { collapsed: boolean }) => (props.collapsed ? 80 : 256)}px;
  flex-grow: 0;
  height: inherit;
  min-height: 101vh;
  background-color: #001529;
  box-shadow: inset -4px 4px 10px -3px #2d4c69;
  padding-top: 10px;
  transition: width 0.2s;
  & .ant-menu {
    font-size: 18px;
    transition: width 0.2s;
    box-shadow: inset -13px 0px 10px -12px #2d4c69;
  }
  @media (max-width: 450px) {
    width: ${(props: { collapsed: boolean }) => (props.collapsed ? 50 : 200)}px;
    & .ant-menu {
      width: ${(props: { collapsed: boolean }) => (props.collapsed ? 50 : 200)}px;
      font-size: 12px;
    }
  }
`;

const MyMenu = styled(Menu)`
  position: sticky;
  top: 20px;

  & .anticon > svg {
    width: 30px;
    height: 30px;
  }
  & .ant-menu-item-selected,
  .ant-menu-item-active {
    background-color: unset !important;
  }
  & .ant-menu-submenu-selected {
    color: unset !important;
  }
  & .ant-checkbox + span {
    font-size: 17px;
    color: white;
    @media (max-width: 450px) {
      font-size: 13px;
    }
  }
`;
