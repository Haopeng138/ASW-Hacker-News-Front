import React, { Component } from "react";
import APIservice from "../../service/APIservice";
import { Button } from "react-bootstrap";

export default class MakeComment extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state={
            postId : props.postid,
            comments : null 
        }
    }
    handleChange(event) {
        this.setState({
            comments: event.target.value}
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const putData = {
            "content" : this.state.comments
        }
        APIservice.post('submissions/' + this.state.postId+'/comments',putData).then(
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
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea cols="60" rows="8" type="text" defaultValue={this.props.postid} onChange={this.handleChange} /> 
                <Button  type="submit"> Comment </Button>
            </form>
           
        );
    }

}