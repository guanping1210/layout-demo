import './App.css';
import { useState, useEffect } from 'react'
import GridLayout, { Responsive as ResponsiveGridLayout } from 'react-grid-layout'
import ChartDemo from './chart.jsx'
import { Progress } from 'antd'
import 'antd/dist/antd.min.css'
import music from './warning.wav'
import TreeMenu from './Tree'
import Transfer from './Transfer'
import UploadList from './Upload'

function App() {
  const [count, setCount] = useState(0)
  let timer = null

  // 监听检测一条记录是否播放完毕
  useEffect(() => {
    // 18秒循环一次
    if(count === 0) {
      clearInterval(timer)
      return 
    }

    if(count === 1) {
      play()
    }

    timer = setInterval(() => {
      console.log('-----', document.getElementById('audio').ended, count)
      if(document.getElementById('audio').ended && count !== 0) {
        // 上一次播放完毕，减少一次，并重新开启播放
        console.log('-----', '播放完毕')
        setCount(count - 1)
        if(count - 1 > 0) {
          play()
        }
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [count])

  const play = () => {
    document.getElementById('audio').play()
  }

  const pause = () => {
    document.getElementById('audio').pause()
  }

  return (
    <div className="App">
      <h3>文件批量上传</h3>
      <UploadList />
      {/* <div style={{ display: 'flex'}}>
      <div>
        <h3>穿梭框</h3>
        <Transfer />
      </div>
      <div style={{ marginLeft: '50px'}}>
        <h3>树状菜单</h3>
      <TreeMenu />

        </div>
      </div> */}
      {/* <h4>本地音乐播放</h4>
      <div>
        <button onClick={() => setCount(count + 1)}>
          点我播放N次，点击一次添加一次播放
        </button>
        <button onClick={() => { play()}}>点击我播放</button>
        <button onClick={() => { pause()}}>点击我暂停</button>
        <audio id="audio" src={music} controls="controls" />
      </div>
      <Progress percent={60} strokeColor={{
        from: 'yellow',
        to: 'blue',
      }} success={{ percent: 30,  strokeColor: 'yellow'}} trailColor={'red'}/>
      <div>
        <Progress />
      </div>
      <h4>demo 进度条</h4>
      <div>
        <div className="custom-progress">
          <div className="custom-all"></div>
          <div className="custom-success"></div>
          <div className="arrow">
            <span>累计损伤</span>
            <span>|</span>
            <span>剩余寿命</span>
          </div>
        </div>
      </div>
      <h4>响应式布局, 定位的布局只能写在子元素中，写在layout中不起作用</h4>
      <ResponsiveGridLayout 
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 2, md: 2, sm: 2, xs: 2, xxs: 2}}
        rowHeight={300} 
        width={1200} 
        layoutes={position} 
        className="layout"
      >
        {
          ['a', 'b', 'c', 'd', 'e'].map((item, index) => {
            return <div key={item} className="box" data-grid={position[index]}>
                {item}-{index}
                {index === 0 ? <ChartDemo /> : ''}
            </div>
          })
        }
      </ResponsiveGridLayout> */}

      {/* <h4>grid-layout-demo</h4> */}
      {/* <GridLayout 
        className="layout" 
        // TODO 布局
        layout={position} 
        cols={2} 
        rowHeight={300} 
        width={1200}
      >
        <div 
          key="a" 
          className="box" 
        >AAAAAAAAA</div>
        <div 
          key="b" 
          className="box" 
        >BBBBBBB</div>
        <div 
          key="c" 
          className="box" 
          style={{
            background: 'red',
          }}
        >CCCCCCC</div>
        <div 
          key="d" 
          className="box" 
        >DDDDDDD</div>
        <div 
          key="e" 
          className="box" 
        >EEEEEEEEEEEEEEE</div>
      </GridLayout> */}
    </div>
  );
}

export default App;

/**
 * 可以定义layouts, 也可以在子元素中用data-grid来定位元素
 */
  // layout应被定义为一个数组，数组中每一项是一个对象，通过配置对象中的相关属性的值来实现相应的布局和设置
  /**
   * static  固定，不可拖放
   */
  const layout = [
    {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
    {i: 'b', x: 1, y: 0, w: 3, h: 2, static: true},
    {i: 'c', x: 4, y: 0, w: 1, h: 2, static: true }
  ];

  // 1-5的布局
  const  position = [
    {i: 'a', x: 0, y: 0, w: 1, h: 1, static: false},
    {i: 'b', x: 1, y: 0, w: 1, h: 1, static: false},
    {i: 'c', x: 0, y: 1, w: 1, h: 1, static: true },
    {i: 'd', x: 1, y: 1, w: 1, h: 1, static: true },
    {i: 'e', x: 0, y: 2, w: 1, h: 1, static: true }
  ]

