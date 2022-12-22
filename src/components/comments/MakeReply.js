import React, { Component } from "react";
import APIservice from "../../service/APIservice";
import { Button } from "react-bootstrap";

export default class MakeReply extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state={
            commentId : props.commentId,
            comments : null,
            
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
        APIservice.post('comments/' + this.state.commentId + "/",putData).then(
            response => {
              this.setState({
                user: response.data,
                message: 'Updated!'
              });
            }, error => {
              this.setState({
                message: ''
              });
            }
          );

    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea cols="60" rows="8" type="text" defaultValue={this.props.commentId} onChange={this.handleChange} /> 
                <Button  type="submit"> reply </Button>
            </form>
           
        );
    }

}