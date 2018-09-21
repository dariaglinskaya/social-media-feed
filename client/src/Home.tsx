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
  renderCards() {
    return this.props.actual_cards.map((card, index): any => {
      return <CardItem key={index}
        {...card} />
    });
  }
  public onLoadMore() {
    this.props.loadMore();
  }
  public render() {
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
          <Footer className="footer">Last update {new Date().toLocaleDateString()}</Footer>
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