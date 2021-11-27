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

export default function SideMenu({
  filterByGenre,
  filterByKeyword,
  filterByYear,
  yearRange,
  numberOfMovies,
}: Props) {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState<CheckboxValueType[]>(genres);
  const [selectAll, setSelectAll] = useState(true);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedYearRange, setSelectedYearRange] = useState(yearRange);
  const [searchString, setSearchString] = useState('');

  //Tooltip marks of year slider (UNIMPORTANT)
  const yearSliderMarks = useMemo(() => calcYearSliderMarks(yearRange), [yearRange]);

  function onGenreSelectionChange(e: CheckboxValueType[]) {
    setSelectedGenres(e);
    setIndeterminate(e.length < genres.length);
    setSelectAll(e.length === genres.length);
    filterByGenre(e);
  }

  function onSelectAllChange(e: CheckboxChangeEvent) {
    setSelectedGenres(e.target.checked ? genres : []);
    setIndeterminate(false);
    setSelectAll(e.target.checked);
    filterByGenre(e.target.checked ? genres : []);
  }

  return (
    <div
      style={{
        width: collapsed ? 80 : 256,
        flexGrow: 0,
        height: 'inherit',
        backgroundColor: '#001529',
        paddingTop: '1em',
        transition: 'width 0.2s',
      }}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}>
      <Menu mode='inline' theme='dark' inlineCollapsed={collapsed} style={{ position: 'sticky', top: 20 }}>
        {/* Genre Filtering */}
        <Menu.SubMenu
          key='genre'
          icon={<VideoCameraOutlined style={{ fontSize: '2em' }} />}
          title='Filter by genre'
          style={{ fontSize: '1.3em' }}>
          <Menu.Item key='0' style={{ backgroundColor: '#000c17' }}>
            <Checkbox
              style={{ color: 'white', fontSize: '1.3em' }}
              indeterminate={indeterminate}
              onChange={(e) => {
                onSelectAllChange(e);
              }}
              checked={selectAll}>
              Check all
            </Checkbox>
          </Menu.Item>
          <Menu.Item key='1' style={{ height: 'fit-content', backgroundColor: '#000c17' }}>
            <Checkbox.Group
              style={{ display: 'flex', flexDirection: 'column', gap: '0.2em' }}
              options={genres}
              value={selectedGenres}
              onChange={(e) => {
                onGenreSelectionChange(e);
              }}
            />
          </Menu.Item>
        </Menu.SubMenu>

        {/* Keyword Filtering */}
        <Menu.SubMenu
          key='keyword'
          icon={<SearchOutlined style={{ fontSize: '2em' }} />}
          title='Filter by keyword'
          style={{ fontSize: '1.3em' }}>
          <Menu.Item
            key='2'
            style={{ backgroundColor: '#000c17', padding: 0, paddingTop: 10, paddingBottom: 10 }}>
            <Input
              style={{ width: '85%', marginLeft: '7.5%' }}
              size='large'
              placeholder='enter a keyword...'
              allowClear
              bordered
              prefix={<SearchOutlined style={{ color: 'black' }} />}
              value={searchString}
              onChange={(e) => {
                filterByKeyword(e.target.value);
                setSearchString(e.target.value);
              }}
            />
          </Menu.Item>
        </Menu.SubMenu>

        {/* Year Filtering */}
        <Menu.SubMenu
          key='year'
          icon={<ClockCircleOutlined style={{ fontSize: '2em' }} />}
          title='Filter by year'
          style={{ fontSize: '1.3em' }}>
          <Menu.Item
            key='3'
            style={{ backgroundColor: '#000c17', display: 'flex', alignItems: 'flex-end', height: '4em' }}>
            <Slider
              style={{ width: '85%', marginLeft: '7.5%' }}
              range={{ draggableTrack: false }}
              marks={yearSliderMarks}
              max={yearRange[1]}
              min={yearRange[0]}
              defaultValue={selectedYearRange}
              onAfterChange={(range: [number, number]) => {
                filterByYear(range);
                setSelectedYearRange(range);
              }}
            />
          </Menu.Item>
        </Menu.SubMenu>
        {!collapsed ? (
          <Menu.Item>
            <p style={{ fontSize: '1.3em' }}>{`Now showing: ${numberOfMovies} movies`}</p>
          </Menu.Item>
        ) : null}
      </Menu>
    </div>
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
