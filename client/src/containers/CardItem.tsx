import { Card  } from 'antd';
import { Icon, Avatar } from 'antd';
import * as React from 'react';

const { Meta }: any = Card as any;
export interface IProps {
    text: any;
    display_url: any;
    caption: any;
    image: any;
    likes: any;
    comments: any;
    profile_picture: any;
    username: string;
    cover: any;
    actions: any;
}
export interface IState {

}
export class CardItem extends React.Component<IProps, IState> {
    public constructor(props) {
        super(props);
    }
    public render(): any {
        return (
            <div>
                <Card
                    cover={this.props.image ? <img alt="example" src={this.props.image} /> : "" }
                    actions={[<Icon type="heart" key={1} />, <Icon type="message" key={2} />, <Icon type="ellipsis" key={3} />]}
                    className="card-item"
                >
                    <Meta
                        avatar={<Avatar src={this.props.profile_picture} />}
                        title={<span>{this.props.username}</span>}
                        description={this.props.text}
                    />
                </Card>
            </div>

        )
    }
}