import { Layout, Row, Button, Icon, Spin, Avatar, Card, Col } from 'antd';
/*import { Card as _Card } from 'antd';
const Card = _Card as any;*/
import * as React from 'react';/*
import { Col as _Col } from 'antd';
const Col = _Col as any;*/
import './App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Search from './containers/Search';
import feedActions from './actions/feedActions';
const { Meta } = Card;
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
  public instagram(e) {
    this.props.instagram();
    e.preventDefault();
  }
  public twitter() {
    this.props.twitter();
  }
  public vk() {
    this.props.vk();
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
      return <Card
        cover={card.image ? <img alt="example" src={card.image} /> : ""}
        actions={[<Icon type="heart" key={1} />, <Icon type="message" key={2} />, <Icon type="ellipsis" key={3} />]}
        className="card-item"
        key={index}
      >
        <Meta
          avatar={<Avatar src={card.profile_picture} />}
          title={<span>{card.username}</span>}
          description={card.text}
        />
      </Card> 
      /*return <CardItem 
        {...card} />*/
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
              <Button href="https://api.instagram.com/oauth/authorize/?client_id=bb70807d70154d83ada0d4ddc8492fdb&amp;redirect_uri=http://localhost:3000/&amp;response_type=token&amp;scope=public_content" ><Icon type="instagram" theme="outlined" /></Button>
              <Button href='https://api.twitter.com/oauth/authenticate?oauth_token=Z6eEdO8MOmk394WozF5oKyuAv855l4Mlqo7hhlSLik'><Icon type="twitter" theme="outlined" /></Button>
              <Button onClick={this.vk}><Icon type="bold" theme="outlined" /></Button>
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
const mapDispatchToProps = dispatch => {
  const instagram = (code) => feedActions.instagram(code);
  const twitter = () => feedActions.twitter();
  const vk = () => feedActions.vk();
  return {
    ...bindActionCreators({ instagram, twitter, vk }, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);