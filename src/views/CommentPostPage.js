import React, {Component} from 'react';
import APIservice from '../service/APIservice';
import { Row, Container } from 'react-bootstrap';
import PostBanner from '../components/post/PostBanner';

export default class CommentPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: null,
            loaded: false,
        }
        console.log('Contruyendo user comments')
    }

    componentDidMount(){
        //console.log('submissions/'+this.queryParams())
        var path = window.location.pathname
        console.log("CommentPostPage")
        console.log(path)
        APIservice.get('submissions/'+1+'/').then(response =>{
            console.log(JSON.stringify(response.data))
            this.setState({
                post: response.data,
                loaded: true,
            })
        });
    }


    render(){
      const {  post ,loaded} = this.state
      if (!loaded){ return <> 
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
          Cargando ...
        </div>
      </> }
      return <>
        <Container>
              <Row key={post.id}> <PostBanner submission={this.state.post.id}/> </Row>
        </Container>
      </>
    }

}