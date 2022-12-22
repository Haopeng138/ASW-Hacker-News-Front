import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import VoteButton from '../VoteButton'
import {NavLink} from "react-router-dom";
import APIservice from "../../service/APIservice";

export default class CommentBanner extends Component{
    // {
    //     "id": 1,
    //     "postID": 1,
    //     "user": {
    //       "id": 1,
    //       "username": "Usuario 1"
    //     },
    //     "insert_date": "2022-12-16T15:31:31.312937Z",
    //     "content": "Aquest es un enllaç a google",
    //     "replyTo": null
    //   }
    constructor(props){
        super(props);
        console.log(JSON.stringify(props.comment))
        this.state = {
            comment: props.comment,
            loaded : false,
            postTitle: null
        }
        this.update = this.update.bind(this)
    }
    componentDidMount(){
        APIservice.get('submissions/'+this.state.comment.postID+'/').then(response => {
          this.setState({
            postTitle: response.data.title,
            loaded: true
          })
        })
      }
    
    update(){
        this.setState({comment: this.state.comment, loaded:false})
        APIservice.get('comments/'+this.state.comment.id+'/').then( (response) => this.setState({comment: response.data, loaded: true}))
    }

    render()
    {
        const {comment, loaded,postTitle} = this.state
        if (!loaded) return <p> Cargando..</p>
        return<>
            <Row xs={10} lg={10}>
                <Col xs={1} style={{width:'35px'}}> <VoteButton update={this.update} id={comment.id} type='comment' /> </Col>
                <Col>
                    <Row xs='auto' style={{padding:'1px 1px 1px'}}>
                        <Col>
                            <NavLink className='commentTitle' to={'/comments/'+comment.id} style={{ color: 'black', textDecoration: 'none' }}> {comment.user.username} </NavLink>
                        </Col>
                        <Col>
                            {/* {APIservice.get('comments/'+this.state.comment.id+'/').then((response) => this.state.comment.insert_date)} */}
                            | <NavLink className='commentParent' to={'/comments/'+APIservice.get('comments/'+this.state.comment.id+'/').then((response) => this.state.comment.replyTo)}> on: {postTitle}  </NavLink>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                         {comment.content}
                        </Col>
                    </Row>

                </Col>
            </Row>
        </>

    }
}