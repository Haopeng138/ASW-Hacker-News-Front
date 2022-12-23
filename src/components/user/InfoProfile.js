import React, { Component } from "react";

import Card from 'react-bootstrap/Card';
import { NavLink } from "react-router-dom";

// import Form from "react-validation/build/form";
// import Input from 'react-validation/build/input';
export default class InfoProfile extends Component {
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
                            Karma :   {this.props.user.karma}
                        </Card.Text>
                        <Card.Text>
                            About :   {this.props.user.about} 
                        </Card.Text>
                        <NavLink to={"/profile/"+this.state.user.id+'/comments'}>user comments</NavLink>
                        <br></br>
                        <NavLink to={"/profile/"+this.state.user.id+'/submissions'}>user submissions</NavLink>
                        <br></br>
                        <br></br>
                       
                    </Card.Body>
                </Card>
        
            

            </>
        );
    }
}  