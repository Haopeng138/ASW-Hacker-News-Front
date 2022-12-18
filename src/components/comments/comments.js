import React, { Component } from "react";

export default class comments extends Component {
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
    constructor(props){
        super(props);
        this.state
    }

    renderStatus(status) {
        const htmlStatus = {
          voted: <div className="titleUser mr-1">&nbsp;&nbsp;&nbsp;&nbsp;</div>,
          unvoted: <div className="title clickable mr-1" onClick={ this.onClickVote }>▲</div>,
          owner: <span className="titleUser">&nbsp;*&nbsp;&nbsp;</span>
        };
        return htmlStatus[status];
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
                          { this.renderStatus(comment.status) }
                        </td>
                        <td>
                          <a className="yclinks" href={ '/users/' + comment.user.id }>{ comment.user.username }</a>&nbsp;
                          <span className="subtext">
                            { Moment(comment.created_at).fromNow() + ' ' }
                          </span>
                          { comment.status === 'voted' &&
                            <>
                              <span className="subtext">|</span>
                              &nbsp;
                              <span className="subtext clickable" onClick={ this.onClickUnvote } >unvote</span>
                              &nbsp;
                            </>
                          }
                          { comment.status === 'owner' &&
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
                          }
                          { on &&
                            <>
                              <span className = "yclinks">| on: </span>
                              <a className="yclinks" href={ '/comment/' + comment.parent_contribution.id }>{ comment.parent_contribution.title }</a>
                            </>
                          }
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
                                    ref={c => {this.checkBtn = c;}}
                                  />
                                </Form>
                              :
                                comment.text 
                            }
                          </td>
                      </tr>
                      <tr>
                        <td colSpan="1"></td>
                        <td>
                          { reply &&
                            <a className="subtextB" href={ '/reply/' + comment.id }>reply</a>
                          }
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