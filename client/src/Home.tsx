import { Col, Layout, Row, Select, Button, Icon } from 'antd';
import * as React from 'react';
import './App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CardItem } from './containers/CardItem';
import Search from './containers/Search';
import feedActions from './actions/feedActions';
const Option = Select.Option;
const { Header, Footer, Content } = Layout;
const children: any = [];
for (let i = 10; i < 20; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
interface IProps {
  instagram?: any;
  twitter?: any;
  vk?: any;
}
class Home extends React.Component<IProps, any> {
  constructor(props) {
    super(props);
  }
  public instagram() {

  }
  public twitter() {
    this.props.twitter();
  }
  public vk() {
    this.props.vk();
  }
  public componentDidMount() {
    this.props.instagram(window.location.href.slice(-32));
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
              <Button href="https://api.instagram.com/oauth/authorize/?client_id=bb70807d70154d83ada0d4ddc8492fdb&amp;redirect_uri=http://localhost:3000/&amp;response_type=token&amp;scope=public_content" onClick={this.instagram.bind(this)}><Icon type="instagram" theme="outlined" /></Button>
              <Button onClick={this.twitter}><Icon type="twitter" theme="outlined" /></Button>
              <Button onClick={this.vk}><Icon type="bold" theme="outlined" /></Button>
              <Content className="content">
                <CardItem />
                <CardItem />
                <CardItem />
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
    cards: state.cards
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