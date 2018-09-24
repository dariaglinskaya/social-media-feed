import { Avatar, Icon } from 'antd';
import { Card as _Card } from 'antd';
import * as moment from 'moment';
const Card = _Card as any;
import * as React from 'react';
const { Meta } = Card;

interface IProps {
    image: string;
    source: string;
    shortcode: string;
    likes: number;
    date: any;
    comments: number;
    shorten_text: string;
    text: string;
    profile_picture: string;
    username: string;
}
interface IState {
    shorten: boolean;
}
const IconText = ({ type, text, key }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
const IconLink = ({ type, theme, link }) => (
    <span>
        <a href={link} target="_blank">
            <Icon type={type} theme={theme} style={{ marginRight: 8 }} />
        </a>
    </span>
);
export class CardItem extends React.Component<IProps, IState> {
    public state: any;
    public props: any;
    public setState: any;
    constructor(props) {
        super(props);
        this.state = {
            shorten: false
        }
    }
    componentDidMount() {
        if (this.props.text.length > 150) {
            this.setState({ shorten: true })
        }
    }
    public loadMore(e) {
        this.setState({ shorten: false })
    }
    public loadLess(e) {
        this.setState({ shorten: true })
    }
    public render() {
        return (
            <Card
                cover={this.props.image ? <img alt="example" src={this.props.image} /> : ""}
                actions={[<IconText type="heart" key={1} text={this.props.likes} />,
                <IconText type="message" key={2} text={this.props.comments} />,
                <IconText type="calendar" key={2} text={moment(this.props.date).format('MM/DD/YYYY hh:mm:ss')} />,
                this.props.source === 'instagram' ? <IconLink type="instagram" theme="outlined" link={`https://www.instagram.com/p/${this.props.shortcode}`}/> : 
                this.props.source === 'twitter' ? <IconLink type="twitter" theme="outlined" link={this.props.shortcode}/> :
                <IconLink type="bold" theme="outlined" link={`https://vk.com/feed?w=wall${this.props.shortcode}`}/>               
                ]}
                className="card-item"
            >
                <Meta
                    avatar={<Avatar src={this.props.profile_picture} />}
                    title={<span>{this.props.username}</span>}
                    description={this.state.shorten ? [this.props.shorten_text, <a onClick={this.loadMore.bind(this)}>... Load more</a>] : [this.props.text, <a onClick={this.loadLess.bind(this)}>... Load less</a>]}
                />
            </Card>
        )
    }
} 