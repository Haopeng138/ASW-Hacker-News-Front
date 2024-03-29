import React, {Component} from 'react';
import APIservice from '../service/APIservice';
import CommentBanner from '../components/comments/CommentBanner';
import { Row, Container } from 'react-bootstrap';
import MakeReply from '../components/comments/MakeReply';


export default class PostComentListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            loaded: false,
            type: props.type,
        }
        console.log('Contruyendo user comments')
    }

    Params(){
        var path = window.location.pathname
        console.log(path)
        var query = ''
        if(this.state.type === "upvoted"){
          query = "?upvoted=true"
          return query
        }
        return query;
    }

    componentDidMount(){
        //console.log('submissions/'+this.queryParams())
        APIservice.get('submissions/'+1+'/comments').then(response =>{
            console.log(JSON.stringify(response.data))
            this.setState({
                comments: response.data,
                loaded: true,
            })
        });
    }


    render(){
      const {  comments ,loaded} = this.state
      if (!loaded){ return <> 
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
          Cargando ...
        </div>
      </> }
      return <>
        <Container>
            { comments.map((comment) => 
              <Row key={comment.id}> <CommentBanner comment={comment} /> 
              <MakeReply /> </Row>) }
        </Container>
      </>
    }

}