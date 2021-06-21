import { Transfer, Switch } from 'antd';
import { useState, useEffect } from 'react'

const TransferComp = () => {
  const [targetKeys, setTargetKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const [disabled, setDisabled] = useState(false)



  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys)
    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };

  const handleScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  const handleDisable = disabled => {
    setDisabled(disabled)
  };


    return (
      <>
        <Transfer
          dataSource={mockData}
          titles={['Source', 'Target']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          onScroll={handleScroll}
          render={item => item.title}
          disabled={disabled}
          oneWay
          style={{ marginBottom: 16 }}
        />
        <Switch
          unCheckedChildren="disabled"
          checkedChildren="disabled"
          checked={disabled}
          onChange={handleDisable}
        />
      </>
    )
}

export default TransferComp


const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);