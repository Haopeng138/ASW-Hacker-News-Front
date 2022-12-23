import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import VoteButton from '../VoteButton'
import {NavLink} from "react-router-dom";
import APIservice from "../../service/APIservice";
import Cargando from "../Cargando";
import MakeReply from "./MakeReply";

export default class CommentBanner extends Component{
    constructor(props){
        super(props);
        this.state = {
            comment: props.comment,
            loaded : false,
            postTitle: props.postTitle,
            on: props.on === undefined ? true : props.on,
            replies: []
        }
        this.update = this.update.bind(this)
        console.log('CommentBanner ' + props.comment.id)
    }

    componentDidMount(){
      if(this.state.on === true && this.state.postTitle === undefined){
        APIservice.get('submissions/'+this.state.comment.postID+'/').then(response => {
          console.log('Getting post title for comment banner',this)
          this.setState({
            postTitle: response.data.title,
            loaded: true
          })    
        })
      }
      else {
        console.log('join: ' + this.state.comment.replies.join())
        APIservice.get('comments/?id='+this.state.comment.replies.join()).then(response => {
          console.log('Getting replies for comment banner',this)
          this.setState({
            replies: response.data.filter( comment => comment.replyTo === this.state.comment.id ),
            loaded: true
          })
        })
      }

    }

    update(){
        console.log('updating commentBanner ' + this.props.comment.id)
        APIservice.get('comments/'+this.state.comment.id+'/').then( (response) => this.setState({comment: response.data, loaded: true}))
    }

    render()
    {
        const {comment, loaded,postTitle, replies} = this.state
        if (!loaded){
          return <Cargando />
        }
        console.log('Rendering banner for comment ' + comment.id)

        return<>
            <Row xs={10} lg={10}>
              <Col xs={1} style={{width:'35px'}}> <VoteButton update={this.update} id={comment.id} type='comment' /> </Col>
              <Col>
                <Row xs='auto' style={{padding:'1px 1px 1px'}}>
                    <Col>
                        <NavLink to={'/profile/'+comment.user.id}>{comment.user.username}</NavLink> | {comment.time_from_post}
                    </Col>
                    {this.state.on === true && <Col>
                    <>| </><NavLink className='postParent' to={'/submissions/'+this.state.comment.postID}> on: {postTitle}  </NavLink>
                    </Col>}
                </Row>
                <Row>
                    <Col>
                      {comment.content}
                    </Col>
                </Row>
                {!this.state.on && <Row>
                  <MakeReply commentId={comment.id} update={this.props.update}/>
                </Row>}
                {comment.replies.length > 0 && !this.state.on && replies.map( reply => <CommentBanner key={reply.id} comment={reply} on={this.state.on} update={this.props.update}/>) }
              </Col>
            </Row>
        </>

    }
}