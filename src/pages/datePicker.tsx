/*
 * @Author: yym
 * @Date: 2024-03-11 09:07:48
 * @LastEditTime: 2024-03-21 13:23:23
 */
import React from 'react';

import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <RangePicker />
    <RangePicker showTime />
    <RangePicker picker="week" />
    <RangePicker picker="month" />
    <RangePicker picker="quarter" />
    <RangePicker
      picker="year"
      id={{
        start: 'startInput',
        end: 'endInput',
      }}
      onFocus={(_, info) => {
        console.log('Focus:', info.range);
      }}
      onBlur={(_, info) => {
        console.log('Blur:', info.range);
      }}
    />
  </Space>
);

export default App;
