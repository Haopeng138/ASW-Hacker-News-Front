import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

import Profile from "./components/user/Profile";
import APIService from "./service/APIservice";
import Submit from "./components/post/Submit";
class App extends Component {
constructor(props) {
    super(props);
    this.change = this.change.bind(this)
    this.userprofile = this.userprofile.bind(this)
    this.state = {
        loading: true,
        users: {},
        selectUser : null
    };
    }
    componentDidMount() {
        APIService.get('users/').then(
          response => {
            this.setState({
              users: response.data,
              loading: false,
            });
            console.log(response.data);
          }
        );
    }

    change(event){
      this.setState({selectUser : event.target.value});
    }

    userprofile(){
      if (this.state.selectUser !== -1){
        const userId = this.state.selectUser-1
        return this.state.users[userId]
      }
    }


    
  render() {
    const { loading, users } = this.state;
    
    return (
        loading ?
        <>
        </> :
        <>
        <div>
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">Hacker News</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/new">new</Nav.Link>
                    <Nav.Link href="/threads">threads</Nav.Link>
                    <Nav.Link href="/ask">ask</Nav.Link>
                    <Nav.Link href="/submit">submit {this.state.selectUser}</Nav.Link>
                   
                </Nav>
            </Navbar.Collapse>
            <Nav>
              <Nav.Link href="/profile"> </Nav.Link>
                    <Form.Select aria-label="Default select example" onChange={this.change} value={this.state.selectUser}>
                      <option value={this.state.users[0].id}>{users[0].username}</option>
                      <option value={this.state.users[1].id}>{users[1].username}</option>
                      <option value={this.state.users[2].id}>{users[2].username}</option>
                    </Form.Select>
            </Nav>
        </Container>
        </Navbar>
        <BrowserRouter>
        <Routes>
            
            <Route path="/"> </Route>
            <Route path="/profile" element={<Profile user={this.userprofile}/>}></Route>
            <Route path="/submit" element={<Submit/>}> </Route>
        </Routes>
        </BrowserRouter>
        </div>
        </>
    );
  }
}

export default App;
