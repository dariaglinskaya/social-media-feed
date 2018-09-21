import { Layout, Row, Spin, Button } from 'antd';
import * as React from 'react';
import { Col as _Col } from 'antd';
const Col = _Col as any;
import './App.css';
import { CardItem } from './containers/CardItem';
import { connect } from 'react-redux';
import Search from './containers/Search';
import { bindActionCreators } from 'redux';
import feedActions from './actions/feedActions';
const { Header, Footer, Content } = Layout;

interface IProps {
  instagram?: any;
  twitter?: any;
  vk?: any;
  isLoading: boolean;
  inst_cards: any;
  vk_cards: any;
  tw_cards: any;
  actual_cards: any;
  props: any;
  loadMore: any;
}
interface IState {
  not_loading: boolean
}
class Home extends React.Component<IProps, IState> {
  public props: any;
  public state: any;
  public setState: any;
  constructor(props) {
    super(props);
    this.state = {
      not_loading: true
    }
  }
  /*componentWillMount() {
    if (this.props.inst_cards.length !== 0) {
      this.setState({ inst_cards: this.props.inst_cards.slice(0, INITIAL_COUNT), rendering: false });
    } else if (this.props.vk_cards.length !== 0) {
      this.setState({ vk_cards: this.props.vk_cards.slice(0, INITIAL_COUNT), rendering: false });
    } else if (this.props.tw_cards.length !== 0) {
      this.setState({ tw_cards: this.props.tw_cards.slice(0, INITIAL_COUNT), rendering: false });
    }
    console.log(this.state)
  }*/
  renderCards() {
    /*if (this.props.inst_cards.length !== 0) {
      this.setState({ inst_cards: this.props.inst_cards.slice(0, INITIAL_COUNT), rendering: true });
    } else if (this.props.vk_cards.length !== 0) {
      this.setState({ vk_cards: this.props.vk_cards.slice(0, INITIAL_COUNT), rendering: true });
    } else if (this.props.tw_cards.length !== 0) {
      this.setState({ tw_cards: this.props.tw_cards.slice(0, INITIAL_COUNT), rendering: true });
    }*/
    /*if (this.state.inst_cards.length !== 0) {*/
    console.log(this.props)
    return this.props.actual_cards.map((card, index): any => {
      //this.setState({ rendering: false });
      return <CardItem key={index}
        {...card} />
    });
    /* } else if (this.state.vk_cards.length !== 0) {
       return this.state.vk_cards.map((card, index): any => {
         this.setState({ rendering: false });
         return <CardItem key={index}
           {...card} />
       });
     } else if (this.state.tw_cards.length !== 0) {
       return this.state.tw_card.map((card, index): any => {
         this.setState({ rendering: false });
         return <CardItem key={index}
           {...card} />
       });
     }*/
  }
  public shouldComponentUpdate() {
    console.log('should?')
    console.log(this.state)
    return !this.state.rendering
  }
  public onLoadMore() {
    this.props.loadMore();
  }
  public render() {
    console.log(this.state)
    return (
      <div className="App">
        <Layout>
          <Header>
            <Row>
              <Col span={14} offset={5}>
                <Search />
              </Col>
            </Row>
          </Header>
          <Row>
            <Col span={14} offset={5}>
              <Content className="content">
                {this.props.isLoading ? <Spin /> : this.renderCards()}
                {(this.props.actual_cards.length === 0) ? null : (this.state.not_loading) ? (
                  <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                    <Button onClick={this.onLoadMore.bind(this)}>load more</Button>
                  </div>
                ) : <Spin />}
              </Content>
            </Col>
          </Row>
          <Footer className="footer">Footer</Footer>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    inst_cards: state.inst_cards,
    vk_cards: state.vk_cards,
    tw_cards: state.tw_cards,
    actual_cards: state.actual_cards,
    isLoading: state.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  const loadMore = () => feedActions.loadMore();
  return {
    ...bindActionCreators({ loadMore }, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);