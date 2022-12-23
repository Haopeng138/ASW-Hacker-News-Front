import React, { Component } from "react";
import Cargando from "../components/Cargando";
import withRouter from "../global/withRouter";
import APIservice from "../service/APIservice";
import { Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import VoteButton from '../components/VoteButton'
import MakeComment from "../components/comments/MakeComment";
import CommentTree from "../components/comments/CommentTree";

class SubmissionView extends Component{
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      submission: null
    }
    this.update = this.update.bind(this)
  }

  update(){
    console.log('Update SubmissionView')
    this.setState({ loaded:false})
    APIservice.get('submissions/'+this.state.submission.id+'/').then( (response) => this.setState({submission: response.data, loaded: true}))
  }

  render(){
    const {loaded, submission} = this.state
    if (!loaded || submission == null){
      console.log('Submission view not loaded')
      APIservice.get('submissions/'+this.props.router.params.postId+'/').then( (response) =>
      { this.setState({
        submission: response.data,
        loaded: true
       })
      })
      return <Cargando />
    }

    return(<>
    <Container>
      <Row xs={10} lg={10}>
        <Col xs={1} style={{width:'35px'}}> <VoteButton update={this.update} id={submission.id} type='post' /> </Col>
        <Col>
          <Row xs='auto' style={{padding:'1px 1px 1px'}}>
              <p className='postTitle'> {submission.title} </p> {submission.site != null? <a href={submission.url}> ({submission.site}) </a> : null} 
          </Row>
          {submission.text !== undefined && <Row>
            <p className="postText"> {submission.text} </p>
          </Row>}
          <Row>
            <Col>
              {submission.votes} votes by <NavLink to={'/profile/'+submission.user.id}> {submission.user.username} </NavLink> {submission.time_from_post} | {submission.numComments} comments
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <MakeComment postid={submission.id} update={this.update} />
      </Row>
      <Row />
      <Row>
        <h3>Comments</h3>
        <CommentTree postid={submission.id} postTitle={submission.title} update={this.update} />
      </Row>
    </Container>
    
    
    </>)
  }
}

export default withRouter(SubmissionView);