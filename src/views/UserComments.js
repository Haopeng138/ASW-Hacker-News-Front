import React, { Component } from "react";
import APIservice from "../service/APIservice";
import Comment from "../components/comments/Comment";

class UserComments extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      userId : props.UserId,
      loading: true,
      comments: []
    };
  }

  componentDidMount() {
    
    APIservice.get('users/' + this.state.userId + '/comments').then(
      response => {
        this.setState({
          comments: response.data.sort((a, b) => new Date(b.insert_date).getTime() - new Date(a.insert_date).getTime()),
          loading: false
        });
      }
    );
  }

  render() {
    const { loading, comments } = this.state;
    return (
      loading ? 
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
          Cargando ... gsfdgdfs
          
        </div>
      :
       
        <Comment comments={ comments } />

    );
  }
}

export default UserComments;