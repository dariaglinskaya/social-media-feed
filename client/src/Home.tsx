import { Layout, Row, Spin, } from 'antd';
import * as React from 'react';
import { Col as _Col } from 'antd';
const Col = _Col as any;
import './App.css';
import { CardItem } from './containers/CardItem';
import { connect } from 'react-redux';
import Search from './containers/Search';
const { Header, Footer, Content } = Layout;

interface IProps {
  instagram?: any;
  twitter?: any;
  vk?: any;
  isLoading: boolean;
  inst_cards: any;
  vk_cards: any;
  tw_cards: any;
  props: any;
}
class Home extends React.Component<IProps, any> {
  public props: any;
  constructor(props) {
    super(props);
  }
  public loadMore(e) {
    console.log(e.target)
  }
  public renderCards() {
    console.log('render cards')
    let cards = [];
    if (this.props.inst_cards.length !== 0) {
      cards = this.props.inst_cards;
    } else if (this.props.vk_cards.length !== 0) {
      cards = this.props.vk_cards;
    } else if (this.props.tw_cards.length !== 0) {
      cards = this.props.tw_cards
    }
    return cards.map((card, index): any => {
      return <CardItem key={index}
      {...card} />
    });
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
    isLoading: state.isLoading
  };
};

export default connect(mapStateToProps)(Home);