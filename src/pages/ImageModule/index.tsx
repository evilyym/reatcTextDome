/*
 * @Date: 2024-09-07 11:48:02
 * @LastEditors: You yangym@golive.cc
 * @LastEditTime: 2025-02-07 16:32:08
 * @FilePath: \vite-react-ts-seed-master\src\pages\ImageModule\index.tsx
 */
import React, { lazy, Suspense, useState, useEffect, useCallback } from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: auto;
  height: 100%;
  width: 100%;
  display: grid;
`;

const Html = <Y,>() => {
  const [videoList, setVideoList] = useState([1, 2, 3]);
  useEffect(() => {
    return setVideoList([1, 2, 3]);
  }, []);
  return (
    <Wrapper>
      {videoList.map((i) => {
        return <div key={i}></div>;
      })}
    </Wrapper>
  );
};

export default Html;
