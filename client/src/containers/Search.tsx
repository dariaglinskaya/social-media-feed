import { Select } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import feedActions from '../actions/feedActions';
const Option = Select.Option;

const children: any = [];
for (let i = 10; i < 20; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
interface IProps {
    fetchData?: any;
}
interface IState {
    value: string;
}
class Search extends React.Component<IProps, IState>{
    public constructor(props: IProps) {
        super(props);
        this.state = {
            value: ''
        }
    }
    public handleChange(value: any) {
        console.log(this)
        this.setState({value: value})
        this.props.fetchData(value);
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
    return {
        fetchData: (tag) => dispatch(feedActions.renderVKPost(tag))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);