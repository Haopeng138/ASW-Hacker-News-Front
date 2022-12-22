import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import VoteButton from '../VoteButton'
import {NavLink} from "react-router-dom";
import APIservice from "../../service/APIservice";

export default class commentBanner extends Component{

    constructor(props){
        super(props);
        this.state = {
            comment: null
            loaded : true
        }
        this.update = this.update.bind(this)
    }

    update(){
        this.setState({comment: this.state.comment, loaded:false})
        APIservice.get('comments/'+this.state.comment.id+'/').then( (response) => this.setState({comment: response.data, loaded: true}))
    }

    render()
    {
        const {comment, loaded} = this.state
        if (!loaded) return <p> Cargando..</p>
        return<>
            <Row xs={10} lg={10}>
                <Col xs={1} style={{width:'35px'}}> <VoteButton update={this.update} id={comment.id} type='comment' /> </Col>
                <Col>
                    <Row xs='auto' style={{padding:'1px 1px 1px'}}>
                        <NavLink className='commentTitle' to={'/comments/'+submission.id} style={{ color: 'black', textDecoration: 'none' }}> {comment.title} </NavLink>
                    </Row>
                    <Row>
                        <Col>
                            {comment.user.username}
                            {APIservice.get('comments/'+this.state.comment.id+'/').then((response) => this.state.comment.insert_date)}
                            <NavLink className='commentParent' to={'/comments/'+APIservice.get('comments/'+this.state.comment.id+'/').then((response) => this.state.comment.replyTo)}> {comment.title} </NavLink>
                            | on: {comment.title}
                        </Col>
                    </Row>

                </Col>
            </Row>

        </>

    }
}