import React, {Component} from 'react';
import APIservice from '../service/APIservice';
import CommentBanner from '../components/comments/CommentBanner';
import { Row, Container } from 'react-bootstrap';
import { useParams } from "react-router";
import Cargando from '../components/Cargando';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class UserComments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // userID: this.props.userID
            comments: [],
            loaded: false,
            type: props.type,
        }
        console.log('Contruyendo user comments')
    }

    queryParams(){
        var query = ''
        if(this.state.type === "upvoted"){
          query = "?upvoted=true"
          return query
        }
        return query;
    }

    getCommentsFromUser(id){
      
    }

    componentDidMount(){
        //console.log('submissions/'+this.queryParams())
        const params = new URLSearchParams(window.location.pathname);
        console.log(params.values)
        // const id = params.get('userId')
        var id = this.props.params.userId;
        console.log(id)
        APIservice.get('users/'+id+'/comments' + this.queryParams()).then(response =>{
            console.log(JSON.stringify(response.data))
            this.setState({
                comments: response.data,
                loaded: true,
            })
        });
    }


    render(){
      const {  comments ,loaded} = this.state
      if (!loaded){ return <Cargando /> }
      return <>
        <Container>
            { comments.map((comment) => 
              <Row key={comment.id}> <CommentBanner comment={comment} /> </Row>) }
        </Container>
      </>
    }

}

export default withParams(UserComments);