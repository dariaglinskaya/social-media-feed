import { Select, Icon } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import feedActions from '../actions/feedActions';
const Option = Select.Option;

const children: any = [];
for (let i = 10; i < 20; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
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
    public props: any;
    public constructor(props: IProps) {
        super(props);
        this.state = {
            value: ''
        }
    }
    public handleChange(value: any) {
        this.setState({ value: value });
        if (value.length === 0) {
        } else if (value[0].substring(0, 1) !== '#') {
            this.props.fetchDataVK(value[0]);
            this.props.fetchDataTwitter(value[0]);
            this.props.fetchDataInst(value[0]);
        } else if (value[0].substring(0, 1) === '#') {
            this.props.fetchDataVK(value[0].substring(1));
            this.props.fetchDataTwitter(value[0].substring(1));
            this.props.fetchDataInst(value[0].substring(1));
        }
    }
    public render() {
        return (
            <div>
                <Select
                    mode="tags"
                    autoFocus={true}
                    showArrow={true}
                    showSearch={true}
                    style={{ width: '100%' }}
                    placeholder={<IconText type="search" text="Search by tag. #minsk #nasa #programming" />}
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