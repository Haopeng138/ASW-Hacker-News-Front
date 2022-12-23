import React, {Component} from 'react';
import APIservice from '../../service/APIservice';
import Cargando from '../Cargando';
import CommentBanner from './CommentBanner';

class CommentTree extends Component{
  constructor(props){
    super(props)
    this.state = {
      postid: props.postid,
      comments: [],
      loaded: false
    }
  }

  componentDidMount(){
    APIservice.get('submissions/'+this.state.postid+'/comments').then( (response) => {
      this.setState({
        loaded: true,
        comments: response.data
      })
    })
  } 
  getReplies(id){
    return this.state.comments.filter(comment => comment.id === id).sort((a,b)=> new Date(a.insert_date).get_time() - new Date(b.insert_date).get_time())
  }

  render(){
    const {postid, comments, loaded} = this.state;
    if (!loaded){
      console.log('Comment Tree not loaded')
      return <Cargando />
    }

    const rootComments = comments.filter( (comment) => comment.replyTo === null )
    console.log('roots:',rootComments)
    return <>
      {rootComments.map( (root) => ( <CommentBanner key={root.id} comment={root} postTitle={this.props.postTitle} on={false} update={this.props.update} /> ) )}
    </>
  }
}

export default CommentTree;