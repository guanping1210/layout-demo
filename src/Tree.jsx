import { Tree, Input } from 'antd';
import { Transfer, Switch } from 'antd';
import { useState, useEffect } from 'react'
import { cloneDeep } from 'lodash'
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import './Tree.css'

const { Search } = Input;

const TreeMenu = () => {
  const [treeData, setTreeData] = useState(mockData)
  const [expandedKeys, setExpandedKeys] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys)
    setAutoExpandParent(false)
  };

  const onChange = e => {
    const { value } = e.target;
    const array = pullData(treeData)
    const expandedKeys = array.filter(item => item.title.indexOf(value) > -1 && item.parent).map(item => item.parent)

    setExpandedKeys(Array.from(new Set(expandedKeys.flat(Infinity))))
    setAutoExpandParent(true)
    setSearchValue(value)
  };

  // 往下一层级添加项目
  const addItem = (parent, id) => {
    const data = cloneDeep(treeData)
    const deepInsert = (objArray) => {
      objArray.forEach(item => {
        if(item.id === id) {
          item.children.push({
          title: '整机ccccc',
          id: getUUID(),
          children: [],
        })
      } else {
        deepInsert(item.children)
      }
      })
    }

    deepInsert(data)
    setTreeData(data)
  }

  // 删除项目
  const removeItem = (id) => {
    const data = cloneDeep(treeData);

    const deepRemove = (objArray) => {
      const array = []
      objArray.forEach(item => {
        if(item.id !== id) {
          array.push({
            ...item,
            children: deepRemove(item.children)
          })
        }
      })
      return array
    }
    const array = deepRemove(data)
    setTreeData(array)
  }

    const loop = (data, level = 0) =>
      data.map(item => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span className="title-text">
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span className="title-text">{item.title}</span>
          );

        const title_ = <div className="tree-menu-title" style={{ width: (200 - level * 23) + 'px' }}>
          {title}<span className="operation">
            <HomeOutlined onClick={() => addItem(item.parent, item.id)}/>
            <SettingFilled onClick={() => removeItem(item.id)}/>
            <SmileOutlined />
          </span>
        </div>
        if (item.children) {
          return { title: title_, key: item.id, children: loop(item.children, level + 1) };
        }

        return {
          title: title_,
          key: item.id,
        };
      });
    return (
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} />
        <Tree
          showLine
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={loop(treeData)}
        />
      </div>
    );
  
}

export default TreeMenu


const mockData = [
  {
    title: '型号一',
    id: '1',
    children: [
      {
        title: '整机',
        id: '2',
        parent: ['1'],
        children: []
      },
    ]
  },
  {
    title: '型号二x',
    id: '3',
    children: [
      {
        title: '整机x',
        id: '4',
        parent: ['3'],
        children: [
          {
            title: 'xxxx',
            id: '5',
            parent: ['3', '4'],
            children: []
          }
        ]
      },
    ]
  }
]

// 数据平铺 成功
function pullData(arr, oldArr = []){
  let array = oldArr

  arr.forEach(item => {
    const { children, ...rest } = item
    array.push(item)

    if(children && children.length) {
      array = pullData(children, array)
    }
  })

  return array
}

const getUUID = () => {
  return new Date().getTime() + Math.random().toString(36).substr(2);
}