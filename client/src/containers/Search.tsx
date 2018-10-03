import * as React from 'react';

import { Icon, Input as _Input } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import instagramActions from '../actions/instagram';
import twitterActions from '../actions/twitter';
import vkActions from '../actions/vk';

const Input = _Input as any;
const SearchInput = Input.Search;

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
            this.props.fetchDataVK(value);
            this.props.fetchDataTwitter(value);
            this.props.fetchDataInst(value);
        } else if (value[0].substring(0, 1) === '#') {
            this.props.fetchDataVK(value.substring(1));
            this.props.fetchDataTwitter(value.substring(1));
            this.props.fetchDataInst(value.substring(1));
        }
    }
    public render() {
        return (
            <div>
                <SearchInput
                    placeholder="Search by tag. #minsk #nasa #programming"
                    onSearch={this.handleChange.bind(this)}
                    style={{ width: '100%' }}
                    prefix={<Icon type="tag" theme="outlined" />}
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
    const fetchDataVK = (tag) => vkActions.renderVKPost(tag);
    const fetchDataInst = (tag) => instagramActions.renderInstagramPost(tag);
    const fetchDataTwitter = (tag) => twitterActions.renderTwitterPost(tag);
    return {
        ...bindActionCreators({ fetchDataVK, fetchDataInst, fetchDataTwitter }, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);