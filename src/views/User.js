import React, { Component } from "react";

import APIservice from "../service/APIservice";
import Profile from "../components/user/Profile";
import InfoProfile from "../components/user/InfoProfile";
import withRouter from '../global/withRouter.js'
import Cargando from "../components/Cargando";

class User extends Component {
  constructor(props) {
    super(props);
    console.log('Constructing user')
    this.state = {
      user: {},
      loading: true,
    };
  }

  renderUser(user) {
    if (this.props.selectedUserID === null) return <InfoProfile user={user} />
    return (
      user.id === this.props.selectedUserID  ?
        <Profile user={user}/>
      :
        <InfoProfile user={user}/>
    )
  }

  render() {
    const { loading, user } = this.state;
    console.log(this.props.selectedUserID)
    if (loading){
      APIservice.get('users/' + this.props.router.params.userId +"/").then( response => 
        { this.setState({
          user: response.data,
          loading: false
        }) })
        return <Cargando />
    }
    
    if (this.props.router.params.userId !== this.state.user.id){
      this.setState({loading:true})
      return <Cargando />
    }

    return ( this.renderUser(user) );
  }
}

export default withRouter(User);