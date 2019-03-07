/**
 * nns首页表格模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { INNSProps } from './interface/nns.interface';
import BeingTable from './hometable/beingtable';
import RankTable from './hometable/ranktable';
import ListingTable from './hometable/listingtable';
import SoldTable from './hometable/soldtable';

@observer
class TableData extends React.Component<INNSProps, any>
{
  public render()
  {
    return (
      <React.Fragment>
        <BeingTable {...this.props}/>
        <RankTable {...this.props}/>
        <ListingTable {...this.props}/>
        <SoldTable {...this.props}/>
      </React.Fragment >
    );
  }
}

export default injectIntl(TableData);
