import React, { Component } from "react";
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import APIservice from "../../service/APIservice";
import { Row, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

class UserSelector extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      selectIndex: 0,
      users: [],
      selectedUser: null,
      loaded: false,
    }

    this.onChange = this.onChange.bind(this);
    console.log("Constructing UserSelector")
  }

  componentDidMount(){
    APIservice.get('users/').then(response => {
      this.setState({
        users: response.data,
        loaded: true
      })
    })
  }

  onChange(event){
    var index = event.target.value;
    var user = this.state.users[index];
    this.props.onUserChange(user)
    this.setState({
      selectIndex: index,
      selectedUser: user
    })

    APIservice.setToken(user? user.key : '')
  }

  usersAsOptions(){
    return (this.state.users.map((user,i) =>{
      return(
      <option key={user.id} value={i}>
        {user.username}
      </option>);
    })
    );
  }

  render(){
    const { loaded, selectedIndex, selectedUser } = this.state;
    if (!loaded){ return (<></>)}
    return(
      <Container>
        <Row>
          {selectedUser != null ?
          <NavLink to={"/profile/"+this.state.selectedUser.id}> 
            <center>{selectedUser.username} ({selectedUser.karma})</center>
          </NavLink> :
           <center>Select a User</center>}
        </Row>
        <Row>
          <Form.Select aria-label="Default select example" onChange={this.onChange} value={selectedIndex}>
          <option></option>
          {this.usersAsOptions()}
          </Form.Select>
        </Row>
      </Container>
    );
  }
}

export default UserSelector;