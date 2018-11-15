/**
 * 主页布局
 */
import * as React from 'react';
import { observer, inject} from 'mobx-react';
import Topstatistic from './topstatistic';
import Search from './search';
import TableData from './tabledata';
import './index.less';
import { IHomeProps } from './interface/home.interface';
import { injectIntl } from 'react-intl';

@inject('home')
@observer
class Home extends React.Component<IHomeProps,any> {
  public render() {
    return (
      <div className="index-page">
        <Topstatistic {...this.props}/>
        <div className="index-content">
          <Search {...this.props}/>    
          <TableData {...this.props} />   
        </div>
      </div>
    );
  }
}

export default injectIntl(Home);
