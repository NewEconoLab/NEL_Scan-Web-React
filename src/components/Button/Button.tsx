/**
 * 按钮组件
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
// import { injectIntl } from 'react-intl';
import './button.less';

interface IProps
{
	onClick?: () => void,
	style?: object,
	disabled?: boolean,
	text: string,
	search?: boolean,
	mobileBtn?: boolean,
	bgBtn?:boolean,
	// intl:any
}

@observer
export default class Button extends React.Component<IProps, {}> {
	constructor(props: IProps)
	{
		super(props);
	}
	// 监控输入内容
	public onClick = () =>
	{
		if (this.props.onClick)
		{
			this.props.onClick();
		}
	}

	public render()
	{
		const btnClassName = classnames('button-group',
			{
				'search-btn': this.props.search ? this.props.search : false,
				'bg-btn': this.props.bgBtn ? this.props.bgBtn : false,
				'mobile-btn': this.props.mobileBtn ? this.props.mobileBtn : false
			})
		return (
			<div className={btnClassName}
				onClick={this.onClick}
				style={this.props.style}
			>
				{this.props.text}
			</div>
		);
	}
}
