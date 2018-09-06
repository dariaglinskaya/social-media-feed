import { Col, Layout, Row } from 'antd';
import * as React from 'react';
import './App.css';

import { CardItem } from './containers/CardItem';
import { Search } from './containers/Search';

const { Header, Footer, Content } = Layout;

class App extends React.Component {
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

export default App;
