import React, { Component } from "react";
import APIservice from "../../service/APIservice";
import { Button, Col, Collapse, Row } from "react-bootstrap";

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
              this.props.update();
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
            <textarea cols="60" rows="2" type="text" defaultValue='' onChange={this.handleChange} /> 
            <Row> <Col span={2}> <Button size='sm' type="submit" style={{align:'center'}}> Reply </Button> </Col></Row> 
          </form>           
        );
    }

}