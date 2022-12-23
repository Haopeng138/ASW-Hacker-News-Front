import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { NavLink } from "react-router-dom";
import APIservice from "../../service/APIservice";

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
                           <table>
                                <tbody>
                                <tr>
                                    <td valign="top">  About : </td>
                                    <td>  <textarea cols="60" rows="8" type="text" defaultValue={this.props.user.about} onChange={this.handleChange} />  </td>
                                </tr>
                                </tbody>
                           </table>
                        </Card.Text>
                        <Card.Link href={"/upvotecomments/"+this.state.user.id}>upvote comments</Card.Link>
                        <br></br>
                        <Card.Link href={"/upvotecomments/"+this.state.user.id}>upvote submissions</Card.Link>
                        <br></br>
                        <NavLink to={"/profile/"+this.state.user.id+'/comments'}>user comments</NavLink>
                        <br></br>
                        <Card.Link to={"/profile/"+this.state.user.id+'/submissions'}>user submissions</Card.Link>
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