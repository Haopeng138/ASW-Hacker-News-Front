import React, { Component } from "react";

import APIservice from "../service/APIservice";
import Profile from "../components/user/Profile";
import InfoProfile from "../components/user/InfoProfile";
class User extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: {},
      loading: true,
    };
  }

  querySelector(){
    var id = 0
    id  = parseInt(window.location.pathname.split("/").pop()) 
    return id
  }

  componentDidMount() {
    console.log(this.querySelector())
    APIservice.get('users/' + this.querySelector() +"/").then(
      response => {
        this.setState({
          user: response.data,
          loading: false
        });
      }
    );
  }

  renderUser(user) {
    return (
      user.id === 1 ?
        <Profile user={user}/>
      :
        <InfoProfile user={user}/>
    )
  }

  render() {
    const { loading, user } = this.state;
    return (
      loading ? 
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
          Cargando ...
        </div>
      :
        this.renderUser(user)
    );
  }
}

export default User;