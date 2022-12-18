import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
class Post extends Component {
    render() {
        return(
            <>
                <Card >
                    <Card.Body>
                        <Card.Text>
                            title
                        </Card.Text>

                        <Card.Text>
                            url
                        </Card.Text>

                        <Card.Text>
                            text
                        </Card.Text>

                        <Card.Text>
                            Leave url blank to submit a question for discussion. If there is no url, text will appear at the top of the thread. If there is a url, text is optional.
                        </Card.Text>
                        <Card.Text>
                            You can also submit via <Card.Link href="#">bookmarklet</Card.Link>
                        </Card.Text>
                        <br></br>
                    </Card.Body>
                </Card>
            </>
        );
    }
}