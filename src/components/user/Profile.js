import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
export default class Profile extends Component {
    render() {
        return(
            <>
            <Card >
                <Card.Body>
                <Card.Text>
                    Usuario : {this.props.user.username}
                </Card.Text>
                <Card.Text>
                    Karma : {this.props.user.karma}
                </Card.Text>
                <Card.Text>
                    About : {this.props.user.about}
                </Card.Text>
                <Card.Link href="#">upvote comments</Card.Link>
                <br></br>
                <Card.Link href="#">upvote submissions</Card.Link>
                <br></br>
                <Card.Link href="#">user comments</Card.Link>
                <br></br>
                <Card.Link href="#">user submissions</Card.Link>
                <br></br>
                </Card.Body>
            </Card>
            </>
        );
    }
}  