import { Select } from 'antd';
import * as React from 'react';
const Option = Select.Option;

const children: any = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export class Search extends React.Component<{}>{
    public handleChange(value: any) {
        // console.log(`selected ${value}`);
    }
    public render() {
        return (
            <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Search by tag"
                onChange={this.handleChange}
            >
                {children}
            </Select>
        );
    }
}