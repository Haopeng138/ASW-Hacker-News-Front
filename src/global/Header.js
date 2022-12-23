import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import UserSelector from '../components/user/UserSelector';
import { NavLink } from 'react-router-dom';
// import APIservice from '../service/APIservice';

class Header extends Component {
  constructor(props){
		super(props)
		this.state = {
			currentUser: null
		}
	}

	render(){

	return(
		<header>
			<Navbar bg="light" expand="lg">
        <Container>
          {/* <Navbar.Brand href="/">Hacker News</Navbar.Brand> */}
          <Col xs='auto'>
            <NavLink to='/'> <h1>Hacker News</h1> </NavLink>
          </Col>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Col>
            <Navbar.Collapse id="basic-navbar-nav">
              <Container>
                <Nav className="me-auto">
                  <Col><NavLink to="/new">			new</NavLink></Col>
                  <Col><NavLink to="/ask">			ask</NavLink></Col>
                  <Col><NavLink to="/threads">	threads</NavLink></Col>
                  <Col><NavLink to="/submit">	submit </NavLink></Col>
                </Nav>
              </Container>
            </Navbar.Collapse>
          </Col>
          <Col fluid='true'/>
          <Col xs='auto'>
            <UserSelector onUserChange={this.props.onUserChange} />
          </Col>
        </Container>
			</Navbar>

		</header>
		);
	}
}

export default Header;