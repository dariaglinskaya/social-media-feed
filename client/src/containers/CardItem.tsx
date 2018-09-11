import {  Card, Icon } from 'antd';
import * as React from 'react';

const { Meta } = Card;
export interface IProps {
    edge_media_to_caption: any;
    display_url: any;
    caption: any;
    images: any;
    likes: any;
    comments: any;
}
export class CardItem extends React.Component<IProps,{}> {
    public render() {
        {console.log(this.props)}
        return (
            <Card
                style={{ "width": "80%" }}
                cover={<img alt="example" src={this.props.display_url} />}
                actions={[<Icon type="heart" key={1} />, <Icon type="message" key={2} />, <Icon type="ellipsis" key={3} />]}
                className="card-item"
            >                
                <Meta
                    description={this.props.edge_media_to_caption.edges[0].node.text}
                />
            </Card>
        )
    }
}