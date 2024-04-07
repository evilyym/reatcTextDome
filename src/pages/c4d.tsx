/*
 * @Author: yym
 * @Date: 2024-03-28 10:48:52
 * @LastEditTime: 2024-03-28 16:49:14
 */
// import { useRequest } from 'ahooks';

// import { getAssetsFile } from '@/utils/share';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as THREE from 'three';

const C4d: React.FC = () => {
  const navigate = useNavigate();
  const scene = new THREE.Scene();

  return <div></div>;
};

const Wrapper = styled.div``;

export default C4d;
