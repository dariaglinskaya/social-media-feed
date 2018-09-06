import { Avatar, Card, Icon } from 'antd';
import * as React from 'react';

const { Meta } = Card;
export class CardItem extends React.Component<{}> {
    public render() {
        return (
            <Card
                style={{ "width": "80%" }}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[<Icon type="setting"  key={1}/>, <Icon type="edit"  key={2}/>, <Icon type="ellipsis"  key={3} />]}
                className="card-item"               
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
        )
    }
}