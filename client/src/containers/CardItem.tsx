import { Card } from 'antd';
import { Icon, Avatar } from 'antd';
import * as React from 'react';
const { Meta } = Card;
export interface IProps {
    text: any;
    display_url: any;
    caption: any;
    image: any;
    likes: any;
    comments: any;
    profile_picture: any;
    username: string;
    card: any;
    actions: any;
}
export interface ICardProps extends React.Props<any> {
    cover: any;
    actions: any;
}
export interface IState {

}
export class CardItem extends React.Component<IProps & ICardProps, IState> {
    static Card: typeof Card;
    static Meta: typeof Meta;
    static propTypes: {
        cover: any;
        actions: any;
    };
    public constructor(props: any) {
        super(props);
    }
    public render() {
        console.log(this.props)
        return (
            <div>
                <Card                    
                    actions={[<Icon type="heart" key={1} />, <Icon type="message" key={2} />, <Icon type="ellipsis" key={3} />]}
                    className="card-item"
                    cover={this.props.image ? <img alt="example" src={this.props.image} /> : ""}
                >
                    <Meta
                        avatar={<Avatar src={this.props.profile_picture} />}
                        title={<span>{this.props.username}</span>}
                        description={this.props.text}
                    />
                </Card>
            </div>
        );
    }
}