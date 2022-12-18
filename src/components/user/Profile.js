import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import APIservice from "../../service/APIservice";
// import Form from "react-validation/build/form";
// import Input from 'react-validation/build/input';
export default class Profile extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            user: props.user,
            errors: {},
            message: ''
        };
        
    }
    handleChange(event) {
        this.setState({about: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.about);
        event.preventDefault();
        const putData = {
            "about" : this.state.about
        }
        APIservice.put('users/' + this.state.user.id+'/',putData).then(
            response => {
              this.setState({
                user: response.data,
                errors: {},
                message: 'Updated!'
              });
            }, error => {
              this.setState({
                errors: error.response.data.errors,
                message: ''
              });
            }
          );
    }

    render() {
        return(
            <>
             <form onSubmit={this.handleSubmit}>
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
                            About : <input type="text" defaultValue={this.props.user.about} onChange={this.handleChange} /> 
                        </Card.Text>
                        <Card.Link href="#">upvote comments</Card.Link>
                        <br></br>
                        <Card.Link href="#">upvote submissions</Card.Link>
                        <br></br>
                        <Card.Link href="#">user comments</Card.Link>
                        <br></br>
                        <Card.Link href="#">user submissions</Card.Link>
                        <br></br>
                        <br></br>
                        <Button  type="submit"> Update </Button>
                    </Card.Body>
                </Card>
            </form>
            

            </>
        );
    }
}  