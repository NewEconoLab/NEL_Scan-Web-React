// 输入框组件
import * as React from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import './input.less';

interface IProps {
	placeholder: string,
	status?: string,
	message?: string,
	value: string,
	onChange: (event: any) => void,
	onFocus?: () => void,
	style?: object,
	readonly?: boolean,
	type: string,
	onBlur?: (event: any) => void,
	topsearch?: boolean,
	onEnter?: () => void
}

@observer
export default class Input extends React.Component<IProps, {}> {
	constructor(props: IProps) {
		super(props);
	}
	// 监控输入内容
	public onInputChange = (event: any) => {
		if (this.props.onChange) {
			this.props.onChange(event.target.value);
		}
	}
	// 监控焦点
	public onInputBlur = (event: any) => {
		if (this.props.onBlur) {
			this.props.onBlur(event.target.value);
		}
	}
	// 失去焦点事件
	public onFocus = () => {
		if(this.props.onFocus) {
			this.props.onFocus();
		}
	}
	// 回车事件
	public onKeyDown = (event:any) => {
		if (event.keyCode === 13) {
			if(this.props.onEnter){
				this.props.onEnter();
			}            
        }
	}
	public render() {
		const inputClassName = classnames('input-icon',{'top-search':this.props.topsearch?this.props.topsearch:false})
		return (
			<div className="input-group">
				<input
					className={inputClassName}
					value={this.props.value}
					type={this.props.type}
					placeholder={this.props.placeholder}
					onChange={this.onInputChange}
					style={this.props.style}
					readOnly={this.props.readonly}
					onBlur={this.onInputBlur}
					onFocus = {this.onFocus}
					onKeyDown={this.onKeyDown}
				/>
			</div>
		);
	}
}