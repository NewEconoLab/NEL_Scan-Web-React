/**
 * 表格组件
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';

import './index.less';

interface ITh
{
  name: string,
  key: string
}
interface IProps
{
  tableTh: ITh[];
  tableData: object[];
  render?: (v: string, k, item) => JSX.Element | null;
  totalCount?: number,
  pageSize?: number,
  className?: string,
  intl: any
}

@observer
class Table extends React.Component<IProps, {}> {
  private tableThKeys = this.props.tableTh.map(v => {
    return {key:v.key,name:v.name}
  })

  constructor(props: IProps)
  {
    super(props);
  }
  public render()
  {
    let tableClassName = "table-wrap";
    if (this.props.className)
    {
      tableClassName = classnames('table-wrap', { [this.props.className]: !!this.props.className });
    }
    if (!!!this.props.tableData)
    {
      return (
        <div className={tableClassName}>
          {this.props.children}
          <div className="table-content">
            <div className="table-th">
              <ul>
                {
                  this.props.tableTh.map((item, index) =>
                  {
                    return <li key={index}>{item.name}</li>
                  })
                }
              </ul>
            </div>
            <div className="no-data-content">{this.props.intl.messages.tableTh.nodata}</div>
          </div>
          {/* 移动端表格 */}
          <div className="mobile-table-content">
            <div className="table-body">
              <ul>
                <li>
                  {
                    this.props.tableTh.map((item, index) =>
                    {
                      return (
                        <div className="table-line" key={index}>
                          <span className="line-title" >{item.name}</span>
                          <span className="line-content">
                            {this.props.intl.messages.tableTh.nodata}
                          </span>
                        </div>
                      )
                    })
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className={tableClassName}>
        {this.props.children}
        <div className="table-content">
          <div className="table-th">
            <ul>
              {
                this.props.tableTh.map((item, index) =>
                {
                  return <li key={index}>{item.name}</li>
                })
              }
            </ul>
          </div>
          {/* 没有数据时 */}
          {
            this.props.tableData.length === 0 && (
              <div className="no-data-content">{this.props.intl.messages.tableTh.nodata}</div>
            )
          }
          {/* 有数据时 */}
          {
            this.props.tableData.length !== 0 && (
              <div className="table-body">
                <ul>
                  {
                    this.props.tableData.map((item: object, index: number) =>
                    {
                      return (
                        <li key={index}>
                          {
                            this.tableThKeys.map((k: object, i: number) =>
                            {
                              if (!this.props.render)
                              {
                                return <span key={i}>{item[k["key"]]}</span>
                              }
                              const renderHtml = this.props.render(item[k["key"]], k["key"], item);
                              if (!renderHtml)
                              {
                                return <span key={i}>{item[k["key"]]}</span>
                              }
                              return <React.Fragment key={i}>{renderHtml}</React.Fragment>
                            })
                          }
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          }
        </div>
        {/* 移动端表格 */}
        <div className="mobile-table-content">
          {/* 没有数据时 */}
          {
            this.props.tableData.length === 0 && (
              <div className="table-body">
                <ul>
                  <li>
                    {
                      this.props.tableTh.map((item, index) =>
                      {
                        return (
                          <div className="table-line" key={index}>
                            <span className="line-title" >{item.name}</span>
                            <span className="line-content">
                              {this.props.intl.messages.tableTh.nodata}
                            </span>
                          </div>
                        )
                      })
                    }
                  </li>
                </ul>
              </div>
            )
          }
          {/* 有数据时 */}
          {
            this.props.tableData.length !== 0 && (
              <div className="table-body">
                <ul>
                  {
                    this.props.tableData.map((item: object, index: number) =>
                    {
                      
                      return (
                        <li key={index}>
                          {
                            this.tableThKeys.map((k: object, i: number) =>
                            {
                              const renderHtml = this.props.render ? this.props.render(item[k["key"]], k["key"], item) : null;
                              return (
                                <div className="table-line" key={i}>
                                  <span className="line-title">{k["name"]}</span>
                                  <span className="line-content">
                                    {
                                      !this.props.render ? item[k["key"]] : (
                                        !renderHtml ? item[k["key"]] : renderHtml
                                      )
                                    }
                                  </span>
                                </div>
                              )
                            })
                          }
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
export default injectIntl(Table)