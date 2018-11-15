/**
 * nns首页布局
 */
import * as React from 'react';
import Total from '@/containers/nns/total';
import Search from './search';
import NNSTables from './nnstables';
import './index.less'
import { inject, observer } from 'mobx-react';
import { INNSProps } from './interface/nns.interface';

@inject('nns')
@observer
class NNS extends React.Component<INNSProps,{}> {
    
    public render() {
        return (
            <div className="nns-page">
                <Total {...this.props}/>
                <div className="nns-content">
                    <Search {...this.props}/>
                    <NNSTables {...this.props}/>                    
                </div>
            </div>
        );
    }
}

export default NNS;
