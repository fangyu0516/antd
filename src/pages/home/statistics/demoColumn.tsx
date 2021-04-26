import { TinyColumn } from '@ant-design/charts';

const data = [274, 337, 81, 497, 666, 219, 269, 154, 235, 222, 241, 167, 190];
const DemoTinyColumn: React.FC = () => {
  const tinyColumnConfig = {
    height: 32,
    autoFit: true,
    data,
    tooltip: {
      customContent: function (x, data) {
        return `NO.${x}: ${data[0]?.data?.y}`;
      },
    },
  };
  return <TinyColumn {...tinyColumnConfig} />;
};

export default DemoTinyColumn;
