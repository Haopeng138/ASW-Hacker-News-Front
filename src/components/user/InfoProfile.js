import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import APIservice from "../../service/APIservice";
// import Form from "react-validation/build/form";
// import Input from 'react-validation/build/input';
export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: props.user,
            errors: {},
            message: ''
        };
        
    }


    render() {
        
        return(
            <>
                <Card >
                    <Card.Body>
                        {this.props.errors}
                        <br>
                        </br>
                        {this.props.message}
                        <Card.Text>
                            Usuario : {this.props.user.username}
                        </Card.Text>
                        <Card.Text>
                            Karma : {this.props.user.karma}
                        </Card.Text>
                        <Card.Text>
                            About : {this.props.user.about} 
                        </Card.Text>
                        <Card.Link href="#">user comments</Card.Link>
                        <br></br>
                        <Card.Link href="#">user submissions</Card.Link>
                        <br></br>
                        <br></br>
                       
                    </Card.Body>
                </Card>
        
            

            </>
        );
    }
}  