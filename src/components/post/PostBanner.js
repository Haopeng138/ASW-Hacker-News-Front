import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import VoteButton from '../VoteButton'
import {NavLink} from "react-router-dom";
import APIservice from "../../service/APIservice";
import Cargando from "../Cargando";

export default class PostBanner extends Component{
    
    constructor(props){
      super(props);
      this.state = {
        submission: props.submission,
        loaded : true
      }
      this.update = this.update.bind(this)
    }

    update(){
      this.setState({ loaded:false})
      APIservice.get('submissions/'+this.state.submission.id+'/').then( (response) => this.setState({submission: response.data, loaded: true}))
    }

    render()
    { 
      const {submission, loaded} = this.state
      if (!loaded) return <Cargando />
      return<>
        <Row xs={10} lg={10}>
          <Col xs={1} style={{width:'35px'}}> <VoteButton update={this.update} id={submission.id} type='post' /> </Col>
          <Col>
            <Row xs='auto' style={{padding:'1px 1px 1px'}}>
              <NavLink className='postTitle' to={'/submissions/'+submission.id} style={{ color: 'black', textDecoration: 'none' }}> {submission.title} </NavLink> {submission.site != null? <a href={submission.url}> ({submission.site}) </a> : null} 
            </Row>
            <Row>
              <Col>
                {submission.votes} votes by <NavLink to={'/profile/'+submission.user.id}> {submission.user.username} </NavLink> {submission.time_from_post} | {submission.numComments} comments
              </Col>
              <Col>
                <NavLink to={"/submissions/"+submission.id}> comment </NavLink>
              </Col>
            </Row>
          </Col>
        </Row>
        
      </>
        
    }
}

// <li key={submission.id}>
//             <table border='0' cellPadding='0' cellSpacing='0'>
//                 <tr>
//                     <td valign="top" className="votelinks">
//                         <center> 
//                             <a id={submission.id}> 
//                             <div className="votearrow" title='upvote'> </div>
//                             </a>
//                         </center>
//                     </td>
//                     <td className="title">
//                         <a href={'/submission/'+submission.id} style={{ color: 'black', textDecoration: 'none' }} >{submission.title} </a>
//                         {submission.site != null && <a href={submission.url} className="sitetext"> {' ('+submission.site+')'} </a>}
//                     </td>
//                 </tr>
//                 <tr>
//                     <td colSpan='1' />
//                     <td>
//                         <span className='subline'>
//                         <span className='votes'>{submission.votes} points by </span>
//                         <a href={'/profile/' + submission.user.id}> {submission.user.username}</a> {submission.time_from_post} | {submission.numComments} comments
//                     </span>
//                     </td>
//                 </tr>
//                 <tr className="spacer" style={{height: '5px'}}></tr>
//             </table>
//         </li>