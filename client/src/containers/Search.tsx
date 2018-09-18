import { Select } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import feedActions from '../actions/feedActions';
const Option = Select.Option;

const children: any = [];
for (let i = 10; i < 20; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
interface IProps {
    fetchDataVK?: any;
    fetchDataInst?: any;
    fetchDataTwitter?: any;
}
interface IState {
    value: string;
}
class Search extends React.Component<IProps, IState>{
    public state: any;
    public setState: any;
    public constructor(props: IProps) {
        super(props);
        this.state = {
            value: ''
        }
    }
    public handleChange(value: any) {        
        this.setState({ value: value });
        const tag = value[0].substring(0, 2);
        if ( tag === 'vk') {
            this.props.fetchDataVK(value[0].substring(2));
        } else if(tag === 'in') {
            this.props.fetchDataInst(value[0].substring(2));
        } else if(tag === 'tw') {
            this.props.fetchDataTwitter(value[0].substring(2));
        }
    }
    public render() {
        return (
            <div>
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Search by tag"
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        cards: state.cards
    };
};
const mapDispatchToProps = dispatch => {
    const fetchDataVK = (tag) => feedActions.renderVKPost(tag);
    const fetchDataInst = (tag) => feedActions.renderInstagramPost(tag);
    const fetchDataTwitter = (tag) => feedActions.renderTwitterPost(tag);
    return {
        ...bindActionCreators({ fetchDataVK, fetchDataInst, fetchDataTwitter }, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);