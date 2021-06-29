import * as echarts from 'echarts';
import { useEffect } from 'react'
var base = +new Date(1968, 9, 3);
var oneDay = 24 * 3600 * 1000;
var date = [];

var data = [Math.random() * 300];

for (var i = 1; i < 20000; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}

const option = {
    tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    },
    title: {
        left: 'center',
        text: '大数据量面积图',
    },
    toolbox: {
        // feature: {
        //     dataZoom: {
        //         yAxisIndex: 'none'
        //     },
        //     restore: {},
        //     saveAsImage: {}
        // }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },
    // 公司的好像不能移动
    dataZoom: [{
        type: 'inside',
        start: 0,
        end: 10,
        zoomOnMouseWheel: true,
        moveOnMouseWheel: true,
        preventDefaultMouseMove: true,
    }],
    series: [
        {
            name: '模拟数据',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                }, {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                }])
            },
            data: data
        }
    ]
};

const ChartDemo = () => {
  useEffect(() => {
    const chart = echarts.init(document.getElementById('echart'))

    chart.setOption(
      option
    )
  }, [])

  return <div className="ehcart-box">
    <div id="echart"></div>
  </div>
}

export default ChartDemo