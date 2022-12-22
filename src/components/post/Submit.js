import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import APIservice from "../../service/APIservice";

// import Input from 'react-validation/build/input';
export default class Submit extends Component {
    constructor(props){
        super(props);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeUrl = this.handleChangeUrl.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            errors: {},
            message: '',
            title:'',
            url:'',
            text:''
        };
        
    }
    handleChangeTitle(event) {
        this.setState({title: event.target.value});
    }

    handleChangeUrl(event){
        this.setState({
            url:event.target.value
        });
    }

    handleChangeText(event){
        this.setState({
            text:event.target.value
        });
    }

    handleSubmit(event) {

        alert('A name was submitted: ' + this.state.title);
        const putData = {
            "title" : this.state.title,
            "url" : this.state.url,
            "text" : this.state.text
        }
        event.preventDefault();
        APIservice.setContentType();
        APIservice.post('submissions/',putData).then(
            response => {
              this.setState({
                user: response.data,
                errors: {},
                message: 'Updated!'
              });
            }, error => {
              this.setState({
                errors: error.response.data.errors,
                message: ''
              });
            }
          );
        APIservice.setAccept();
    }

    render() {
        return(
            <>
             <form onSubmit={this.handleSubmit}>
                <Card >
                    <Card.Body>
                        {this.props.errors}
                        <br>
                        </br>
                        {this.props.message}
                        <Card.Text>
                            Title :  <input type="text" name="name" onChange={this.handleChangeTitle}/>
                        </Card.Text>
                        <Card.Text>
                            Url  :  <input type="text" name="name" onChange={this.handleChangeUrl} />
                        </Card.Text>
                        <Card.Text>
                           <table>
                                <tbody>
                                <tr>
                                    <td valign="top">  Text : </td>
                                    <td>  <textarea cols="60" rows="8" type="text"  onChange={this.handleChangeText} />  </td>
                                </tr>
                                </tbody>
                           </table>
                        </Card.Text>
                        <Button  type="submit"> Update </Button>
                    </Card.Body>
                </Card>
            </form>
            

            </>
        );
    }
}  