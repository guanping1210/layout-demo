import './App.css';
import GridLayout, { Responsive as ResponsiveGridLayout } from 'react-grid-layout'
import ChartDemo from './chart.jsx'

function App() {
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

  return (
    <div className="App">
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
      {/* <div 
          key="a" 
          className="box" 
          data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}
        >AAAAAAAAA</div>
        <div 
          key="b" 
          className="box" 
          data-grid={{x: 1, y: 0, w: 1, h: 1,static: true}}
        >BBBBBBB</div>
        <div 
          key="c" 
          className="box" 
          style={{
            background: 'red',
          }}
          data-grid={{x: 0, y: 1, w: 1,h: 1, static: true}}
        >CCCCCCC</div>
        <div 
          key="d" 
          className="box" 
          data-grid={{x: 1, y: 1, w: 1,h: 1, static: true}}
        >DDDDDDD</div>
        <div 
          key="e" 
          className="box" 
          data-grid={{x: 0, y: 2, w: 1,h: 1, static: true}}
        >EEEEEEEEEEEEEEE</div> */}
      </ResponsiveGridLayout>

      <h4>grid-layout-demo</h4>
      <GridLayout 
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
          // data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}
        >AAAAAAAAA</div>
        <div 
          key="b" 
          className="box" 
          // data-grid={{x: 1, y: 0, w: 1, h: 1,static: true}}
        >BBBBBBB</div>
        <div 
          key="c" 
          className="box" 
          style={{
            background: 'red',
          }}
          // data-grid={{x: 0, y: 1, w: 1,h: 1, static: true}}
        >CCCCCCC</div>
        <div 
          key="d" 
          className="box" 
          // data-grid={{x: 1, y: 1, w: 1,h: 1, static: true}}
        >DDDDDDD</div>
        <div 
          key="e" 
          className="box" 
          // data-grid={{x: 0, y: 2, w: 1,h: 1, static: true}}
        >EEEEEEEEEEEEEEE</div>
      </GridLayout>
    </div>
  );
}

export default App;

/**
 * 可以定义layouts, 也可以在子元素中用data-grid来定位元素
 */

