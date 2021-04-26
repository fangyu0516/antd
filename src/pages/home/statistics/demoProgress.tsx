import React, { useState, useEffect } from 'react';
import { Progress } from '@ant-design/charts';

const DemoProgress: React.FC = () => {
  var config = {
    height: 32,
    width: 300,
    autoFit: true,
    percent: 0.6,
    barWidthRatio: 0.3,
    color: ['#5B8FF9', '#E8EDF3'],
  };
  return <Progress {...config} />;
};

export default DemoProgress;