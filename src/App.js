import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Profile from "./components/user/Profile";
import APIService from "./service/APIservice"
class App extends Component {
constructor(props) {
    super(props);

    this.state = {
        loading: true,
        users: {}
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
                    <Nav.Link href="/submit">submit</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Nav>
                <Nav.Link href="/profile">
                     { users[3].username } ({ users[3].karma })
                </Nav.Link>
            </Nav>
        </Container>
        </Navbar>
        <BrowserRouter>
        <Routes>
            <Route path="/"> </Route>
            <Route path="/profile" element={<Profile user={users[3]}/>}></Route>
        </Routes>
        </BrowserRouter>
        </div>
        </>
    );
  }
}

export default App;
