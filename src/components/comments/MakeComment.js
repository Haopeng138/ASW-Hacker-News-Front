import React, { Component } from "react";
import APIservice from "../../service/APIservice";
import { Button, Col, Row } from "react-bootstrap";

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
        console.log('Handeling submit')
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
              this.props.update();
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
              <textarea cols="60" rows="8" type="text" defaultValue='' onChange={this.handleChange} /> 
              <Row> <Col span={2}> <Button size='sm' type="submit" style={{align:'center'}}> Reply </Button> </Col></Row> 
          </form>
           
        );
    }

}