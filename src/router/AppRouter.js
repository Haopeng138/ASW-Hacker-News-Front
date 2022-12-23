import React, { Component } from "react";
import { Route, Routes } from 'react-router-dom'

import PageNotFound from "../views/NotFound";
import User from "../views/User";
import Submit from "../components/post/Submit";
import SubmissionList from "../views/SubmissionListPage";
import UserComments from "../views/CommentListPage";
import PostComentListPage from "../views/PostComentListPage";
import CommentPost from "../views/CommentPostPage";
import APIservice from "../service/APIservice";
import HomePage from "../views/HomePage";
import AskPage from "../views/AskPage";
import SubmissionView from "../views/SubmissionView";

class AppRouter extends Component{

  render(){

    return<>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<Submit/>}> </Route>
          <Route path='/new' element={<SubmissionList type='new' />} />
          <Route path='/ask' element={<AskPage />} /> 
          <Route path='/threads' element={<UserComments />} /> 
          <Route path="/profile/:userId" element={<User selectedUserID={this.props.userId} />}></Route>
          <Route path='/profile/:userId/comments' element={<UserComments/>}> </Route>
          <Route path='/profile/:userId/comments?upvoted' element={<UserComments type="upvoted"/>}> </Route>
          <Route path='/submissions/:postId' element={<SubmissionView />}></Route>
          <Route path='/submissions/:postId/comments' element={<PostComentListPage />}></Route>
          <Route path='/makepostcomment/:posId' element={<CommentPost/>}> </Route>
          <Route element={PageNotFound} />
        </Routes>
      </>
  }
}

export default AppRouter;