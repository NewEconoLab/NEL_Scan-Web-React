// import ProjectInfo from '../store/transation.store';
export default {
  color: ['#5CDC3B', '#FE6868', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
  title: {
    text: '30天交易数',
    textStyle:{
      fontSize:14,
      color:'#fff'
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '1px',
    right: '0',
    bottom: '0',
    containLabel: true
  },
  // legend: {
  //   data:['Buying Price','Selling Price'],
  // },  
  xAxis: {
    type: 'category',
    splitNumber: 30,
    // 设置轴线的属性
    axisLine: {
      lineStyle: {
        color: '#FFF'
      }
    },
    symbol: 'none',
    // show: false,
    data: []
  },
  yAxis: {
    type: 'value',
    name: '',
    // 设置轴线的属性
    axisLine: {
      lineStyle: {
        color: '#FFF'
      }
    },
    splitLine: {
      show: false
    },
    // show: false,

  },
  series: [
    {
      // name: 'Count',
      type: 'line',
      smooth: true,
      // showSymbol: false,
      data: []
    },
    // {
    //   name: 'Selling Price',
    //   type: 'line',
    //   // showSymbol: false,
    //   data: []
    // }
  ]
};
