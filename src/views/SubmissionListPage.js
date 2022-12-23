import React, {Component} from 'react';
import APIservice from '../service/APIservice';
import PostBanner from '../components/post/PostBanner';
import { Row, Container } from 'react-bootstrap';
import Cargando from '../components/Cargando';

export default class SubmissionListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submissions: [],
            loaded: false,
            type: props.type,
        }
      }

    queryParams(){
        var path = window.location.pathname
        var query = '';
        if(path === '/new')          query = '?order_by=insert_date&ascending=false';
        else if (path === '/ask')    query = '?order_by=insert_date&ascending=false&type=ask';
        else                         query = '?order_by=votes&ascending=false';
        return query;
    }

    componentDidMount(){
        //console.log('submissions/'+this.queryParams())
        
    }


    render(){
      const { loaded, submissions } = this.state
      if (!loaded)
      {
        APIservice.get('submissions/' + this.queryParams()).then(response =>{
          this.setState({
            submissions: response.data,
            loaded: true,
          })
        });
        return <Cargando />
      }
      return <>
        <Container>
            { submissions.map((submission) => 
              <Row key={submission.id}> <PostBanner submission={submission} /> </Row>) }
        </Container>
      </>
    }

}