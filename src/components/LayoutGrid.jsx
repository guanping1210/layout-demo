import React, { PureComponent, useState } from 'react';
import { Layout, Button } from 'antd';
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import './LayoutGrid.css'
import ReactEcharts from 'echarts-for-react';
import { getBarChart, getLineChart, getPieChart } from "./chart.js";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const { Header, Content } = Layout;
const defaultProps = {
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 100,
}
const DragLayout = (props) => {
  const [layouts, setLayouts] = useState(defaultProps)
  const [widgets, setWidgets] = useState([])
  const [cols, setCols] = useState()
  const generateDOM = () => {
    return _.map(widgets, (l, i) => {
      let option;
      if (l.type === 'bar') {
        option = getBarChart();
      } else if (l.type === 'line') {
        option = getLineChart();
      } else if (l.type === 'pie') {
        option = getPieChart();
      }
      let component = (
        <ReactEcharts
          option={option}
          notMerge={true}
          lazyUpdate={true}
          style={{ width: '100%', height: '100%' }}
        />
      )
      return (
        <div key={l.i} data-grid={l}>
          <span className='remove' onClick={() => onRemoveItem(i)}>x</span>
          {component}
        </div>
      );
    });
  };

  const addChart = (type) => {
    const addItem = {
      x: (widgets.length * 2) % (cols || 8),
      y:  Infinity, // puts it at the bottom
      w: 2,
      h: 2,
      i: new Date().getTime().toString(),
    };

    console.log('22222', addItem)

    setWidgets([...widgets, {
      ...addItem,
      type
    }])
  };

  const onRemoveItem = (i) => {
    setWidgets(widgets.filter((item, index) => index != i))

  }

  const onLayoutChange = (layout, layouts) => {
    setLayouts(layouts)
  }



  return (
    <Layout className="layout-container">
      <Header style={{ zIndex: 1, height: '100%', width: '150px', 'padding': '0 30px' }}>
        <Button type="primary" style={{ 'marginRight': '7px' }} onClick={() => addChart('bar')}>添加柱状图</Button>
        <Button type="primary" style={{ 'marginRight': '7px' }} onClick={() => addChart('line')}>添加折线图</Button>
        <Button type="primary" style={{ 'marginRight': '7px' }} onClick={() => addChart('pie')}>添加饼图</Button>
      </Header>
      <Content>
        <div style={{ background: '#fff', padding: 20, minHeight: 800, minWidth: 800 }}>
          <ResponsiveReactGridLayout
            className="layout"
            {...props}
            layouts={layouts}
            onLayoutChange={(layout, layouts) =>
              onLayoutChange(layout, layouts)
            }
          >
            {generateDOM()}
          </ResponsiveReactGridLayout>
        </div>
      </Content>
      <div style={{ width: '200px', background: '#001529', padding: 20, minHeight: 800 }}>
        组件配置
</div>
    </Layout>
  )
}

export default DragLayout
