import React from 'react';
import { TinyArea } from '@ant-design/charts';

export type dateAndUV = {
  day: string;
  number: number;
};

const DemoTinyArea: React.FC = () => {
  const datay = [
    {
      x: '2021-04-12',
      y: 7,
    },
    {
      x: '2021-04-13',
      y: 5,
    },
    {
      x: '2021-04-14',
      y: 4,
    },
    {
      x: '2021-04-15',
      y: 2,
    },
    {
      x: '2021-04-16',
      y: 4,
    },
    {
      x: '2021-04-17',
      y: 7,
    },
    {
      x: '2021-04-18',
      y: 5,
    },
    {
      x: '2021-04-19',
      y: 6,
    },
    {
      x: '2021-04-20',
      y: 5,
    },
    {
      x: '2021-04-21',
      y: 9,
    },
    {
      x: '2021-04-22',
      y: 6,
    },
    {
      x: '2021-04-23',
      y: 3,
    },
    {
      x: '2021-04-24',
      y: 1,
    },
    {
      x: '2021-04-25',
      y: 5,
    },
    {
      x: '2021-04-26',
      y: 3,
    },
    {
      x: '2021-04-27',
      y: 6,
    },
    {
      x: '2021-04-28',
      y: 5,
    },
  ];

  var config = {
    height: 32,
    width: 300,
    autoFit: true,
    data: datay.map((item) => item.y),
    smooth: true,
    point: {
      size: 0,
      shape: 'round',
    },
    areaStyle: {
      fill: 'blue',
    },
    tooltip: {
      enterable: true,
      showTitle: true,
      // title: datay.map((item) => item.x),
      showCrosshairs: true,
      showMarkers: true,
      // title:datay.map((item) => item.x),
      marker: {
        fill: 'blue',
        fillOpacity: 0.6,
        stroke: 'white',
        lineWidth: 2,
        strokeOpacity: 1,
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
        cursor: 'pointer',
      },
      showContent: true,
      customContent: (index, data) => {
        return `<div>${datay[index]?.x}&nbsp;&nbsp;&nbsp;&nbsp;${data?.[0]?.data?.y}</div>`;
      },
    },
  };
  return <TinyArea {...config} />;
};

export default DemoTinyArea;
