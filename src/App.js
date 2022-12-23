import React, { Component } from "react";
import { BrowserRouter} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Header from './global/Header';
import AppRouter from "./router/AppRouter";



class App extends Component {
constructor(props) {
    super(props);
    this.state = {
        selectedUser : null
    };
    this.changeUser = this.changeUser.bind(this)
  }

  changeUser(user){
    if (user != null) console.log("App has recieved the change " + user.id)
    this.setState({selectedUser: user})
    //this.setState({selectUser : event.target.value});
  }

    render(){
      console.log(this.state.selectedUser)
      return(
        <BrowserRouter>
          <Header onUserChange={this.changeUser} />
          <main>
            <AppRouter userId={this.state.selectedUser == null ? null: this.state.selectedUser.id } />
          </main>
        </BrowserRouter>
      )

    }
    
  /*render() {
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
                    <Nav.Link href="/submit">submit </Nav.Link>
                   
                </Nav>
            </Navbar.Collapse>
            <Nav>
              <Nav.Link href="/profile" > {this.state.users[this.state.selectUser].username}({this.state.users[this.state.selectUser].karma})</Nav.Link>
                    <Form.Select aria-label="Default select example" onChange={this.change} value={this.state.selectUser}>
                      <option value="0">{users[0].username}</option>
                      
                    </Form.Select>
            </Nav>
        </Container>
        </Navbar>
        <BrowserRouter>
        <Routes>
            
            <Route path="/" element={<SubmissionList type='vote' />} />
            <Route path="/profile" element={<User UserId={this.state.users[this.state.selectUser].id}/>}></Route>
            <Route path="/submit" element={<Submit/>}> </Route>
            <Route path='/new' element={<SubmissionList type='new' />} />
            <Route path='/ask' element={<SubmissionList type='ask' />} /> 
        </Routes>
        </BrowserRouter>
        </div>
        </>
    );
  }*/
}

export default App;
