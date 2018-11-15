// import React, { Component } from 'react';
// import { Scrollbars } from 'react-custom-scrollbars';
// import classnames from 'classnames';
// import style from './index.less';
// import util from 'util';
// import Icon from '@/components/Icon';
// //下拉框组件
// //使用方法
// //<Select name='name' id='id' items={items} onCallback={onCallback}/>
// //其中name为name key ，id 为id key ，取值使用
// //items 为数据集合
// //onCallback选择成功后回掉函数

// class Select extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//       // 选择的项
//       item: {},

//       // 是否展开
//       expand: false
//     };
//     if (props.items && props.items[0]) {
//       this.props.onCallback && this.props.onCallback(props.items[0]);
//     }

//     // 注册全局点击事件，以便点击其他区域时，隐藏展开的内容
//     util.EventHandler.add(this.globalClick);
//   }

//   // 全局点击
//   globalClick = () => {
//     this.setState({ expand: false });
//   }

//   // 选择选项
//   onSelect = (item) => {

//     this.setState({ item: item, expand: false });

//     this.props.onCallback && this.props.onCallback(item);
//   }

//   // 完成
//   // onComplete = (item, init) => {
//   //   this.setState({ expand: false });
//   //   this.props.onComplete && this.props.onComplete(item, init);
//   // }

//   // 展开
//   onExpand = (e) => {
//     // 取反
//     let expand = !this.state.expand;

//     this.setState({
//       expand: expand
//     });

//     e.stopPropagation();
//   }
//   componentWillUnmount() {
//     //  组件释放remove click处理
//     util.EventHandler.remove(this.globalClick);
//   }
//   render() {
//     let { name = 'name', id = 'id' } = this.props;
//     let { items = [] } = this.props;
//     let body = null;
//     let showName = this.state.item[name] || this.props.placeholder || items[0][name];

//     // 普通选择，普通下拉框
//     if (!this.props.children) {
//       let optionsClass = classnames('options', { 'disNone': !this.state.expand });
//       let height = items.length * 41;
//       if (height > 300) {
//         height = 300;
//       }

//       // body ，普通下拉框
//       body = (
//         <div className={optionsClass}>
//           <Scrollbars style={{ height: height }}>
//             {
//               items.map((v, i) => {
//                 return <div key={i} className='option' onClick={this.onSelect.bind(this, v)}>{v[name]}</div>;
//               })
//             }
//           </Scrollbars>
//         </div>
//       );

//       // 内部组件方式
//     } else {

//       // 判断是否显示
//       let contentClass = classnames('select-content', { 'disNone': !this.state.expand });

//       // clone一个新组件传值，每次重新渲染组件，否则内部scrollBars可能不会刷新
//       body = (
//         <div className={contentClass}>
//           {React.cloneElement(this.props.children, { expand: this.state.expand })}
//         </div>
//       );
//     }

//     let selectClass = classnames({
//       'comp-select-container': true,
//       'react-select': !this.state.expand
//     });
//     return (
//       <div className={selectClass} style={this.props.style}>
//         <div className='selected' onClick={this.onExpand}>
//           {showName}
//           <div className="icon-box">
//             <Icon icon={this.state.expand ? 'icon-arrow-top' : 'icon-arrow-bottom'} style={{ fontSize: 14 }} />
//           </div>
//         </div>
//         {body}
//       </div>
//     );

//   }
// }
// export default Select;
