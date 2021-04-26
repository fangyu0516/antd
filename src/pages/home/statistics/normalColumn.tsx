import React from 'react';
import { Column } from '@ant-design/charts';

const NormalColumn: React.FC = () => {
  var data = [
    {
      x: '1月',
      y: 930,
    },
    {
      x: '2月',
      y: 938,
    },
    {
      x: '3月',
      y: 850,
    },
    {
      x: '4月',
      y: 1196,
    },
    {
      x: '5月',
      y: 407,
    },
    {
      x: '6月',
      y: 519,
    },
    {
      x: '7月',
      y: 400,
    },
    {
      x: '8月',
      y: 359,
    },
    {
      x: '9月',
      y: 979,
    },
    {
      x: '10月',
      y: 1191,
    },
    {
      x: '11月',
      y: 1021,
    },
    {
      x: '12月',
      y: 885,
    },
  ];
  var paletteSemanticRed = '#F4664A';
  var brandColor = '#5B8FF9';
  var config = {
    // width: 1100,
    height: 295,
    autoFit: true,
    data: data,
    xField: 'x',
    yField: 'y',
    seriesField: '',
    columnWidthRatio: 0.5,
    color: function color(_ref) {
      var x = _ref.x;
      if (x === '11月' || x === '12月') {
        return paletteSemanticRed;
      }
      return brandColor;
    },
    label: {
      content: function content(originData) {
        var val = parseFloat(originData.y);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
      },
      offset: 10,
    },
    legend: false,
    yAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
      tickInterval: 200,
      grid: {
        line: {
          style: {
            stroke: 'black',
            lineWidth: 0.3,
            lineDash: [4, 1],
            strokeOpacity: 0.1,
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            cursor: 'pointer',
          },
        },
      },
    },
    meta: {
      x: { alias: '类别' },
      y: { alias: '销售额' },
    },
  };
  return <Column {...config} />;
};

export default NormalColumn;
