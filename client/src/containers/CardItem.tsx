import {  Card, Icon } from 'antd';
import * as React from 'react';

const { Meta } = Card;
export interface IProps {
    text: any;
    display_url: any;
    caption: any;
    image: any;
    likes: any;
    comments: any;
}
export class CardItem extends React.Component<IProps,{}> {
    public render() {
        return (
            <Card
                style={{ "width": "80%" }}
                cover={<img alt="example" src={this.props.image} />}
                actions={[<Icon type="heart" key={1} />, <Icon type="message" key={2} />, <Icon type="ellipsis" key={3} />]}
                className="card-item"
            >                
                <Meta
                    description={this.props.text}
                />
            </Card>
        )
    }
}