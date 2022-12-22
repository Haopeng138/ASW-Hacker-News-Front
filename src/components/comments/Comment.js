import React, { Component } from "react";
import APIservice from "../../service/APIservice";
import Moment from "moment";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
export default class Comment extends Component {
    // {
    //     "id": 1,
    //     "postID": 1,
    //     "user": {
    //       "id": 1,
    //       "username": "Usuario 1"
    //     },
    //     "insert_date": "2022-12-16T15:31:31.312937Z",
    //     "content": "Aquest es un enllaç a google",
    //     "replyTo": null
    //   }

    /* Vote | Usuario | tiempo | padre | post */
    /* Content*/
    constructor(props) {
        super(props);
        this.onClickVote = this.onClickVote.bind(this);
        this.onClickUnvote = this.onClickUnvote.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    
        this.state = {
          voted: null,
          user: props.user.username,
          tiempo: props.insert_date,
          padre: props.replyTo,
          post: props.postID,
          content: props.content,
          errors: {},
        };
      }

      componentDidMount() {
        APIservice.get('comment/' + this.state.selectId +"/").then(
          response => {
            this.setState({
              user: response.data,
              loading: false
            });
          }
        );
      }
    
      onClickEdit() {
        this.setState({
          edit: !this.state.edit
        });
      }
    
      onClickDelete() {
        APIservice.delete('/comments/' + this.state.comment.id).then(
          response => {
            window.location.reload()
          }
        );
      }
    
      onClickUnvote() {
        APIservice.delete('/comments/' + this.state.comment.id + '/votes').then(
          response => {
            this.setState({
              comment: response.data,
            });
          }
        );
      }
    
      onClickVote() {
        APIservice.post('/comments/' + this.state.comment.id + '/votes').then(
          response => {
            this.setState({
              comment: response.data,
            });
          }
        );
      }
    
      renderStatus(status) {
        const htmlStatus = {
          voted: <div className="titleUser mr-1">&nbsp;&nbsp;&nbsp;&nbsp;</div>,
          unvoted: <div className="title clickable mr-1" onClick={ this.onClickVote }>▲</div>,
        };
        return htmlStatus[status];
      }
    
      onChangeText(e) {
        this.setState({
          text: e.target.value
        });
      }
    
      handleUpdate(e) {
        e.preventDefault();
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
          APIservice.put('/comments/' + this.state.comment.id, {
            text: this.state.text
          }).then(
            response => {
              this.setState({
                comment: response.data,
                text: response.data.text,
                edit: false
              });
            },
            error => {
              this.setState({
                errors: error.response.data.errors
              });
            }
          )
        }
      }
    
      render() {
        const { comment, on, reply, edit, text, errors, deleteButton } = this.state;
        return(
          <table>
            <tbody>
              <tr>
                <td>
                  <table cellPadding="0" cellSpacing="0">
                    <tbody>
                      <tr>
                        <td>
                          {/* { this.renderStatus(comment.status) } */}
                        </td>
                        <td>
                          {/* <a className="yclinks" href={ '/users/' + comment.user.id }>{ comment.user.username }</a>&nbsp; */}
                          <span className="subtext">
                            {/* { Moment(comment.insert_date).fromNow() + ' ' } */}
                          </span>
                          {/* { comment.status === 'voted' &&
                            <>
                              <span className="subtext">|</span>
                              &nbsp;
                              <span className="subtext clickable" onClick={ this.onClickUnvote } >unvote</span>
                              &nbsp;
                            </>
                          } */}
                          {/* { comment.status === 'owner' &&
                            <>
                              <span className = "subtext">|</span>
                              &nbsp;
                              <span className="subtext clickable" onClick={ this.onClickEdit }>edit</span>
                              &nbsp;
                              { deleteButton &&
                                <>
                                  <span className="subtext">|</span>
                                  &nbsp;
                                  <span className="subtext clickable" onClick={ this.onClickDelete }>delete</span>
                                  &nbsp;
                                </>
                              }
                            </>
                          } */}
                          {/* { on &&
                            <>
                              <span className = "yclinks">| on: </span>
                              <a className="yclinks" href={ '/comment/' + comment.parent_contribution.id }>{ comment.parent_contribution.title }</a>
                            </>
                          } */}
                        </td>
                      </tr>
                      <tr>
                          <td colSpan="1"></td>
                          <td className="comment">
                            { edit ? 
                                <Form onSubmit={ this.handleUpdate } ref={ c => { this.form = c; } }>
                                  <div className="form-group">
                                    <textarea
                                      name="text"
                                      className="form-control"
                                      rows="2"
                                      value={ text }
                                      onChange={ this.onChangeText }
                                    />
                                    { errors.text &&
                                      <div className="alert alert-danger">{ errors.text }</div>
                                    }
                                  </div>
                                  <button type="submit" className="btn btn-primary-mine">update</button>
                                  <CheckButton
                                    style={{ display: "none" }}
                                    // ref={c => {this.checkBtn = c;}}
                                  />
                                </Form>
                              :
                                // comment.text 
                                <p>grbkfj</p>
                            }
                          </td>
                      </tr>
                      <tr>
                        <td colSpan="1"></td>
                        <td>
                          {/* { reply &&
                            <a className="subtextB" href={ '/reply/' + comment.id }>reply</a>
                          } */}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        );
      }
}