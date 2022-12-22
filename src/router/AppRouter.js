import React, { Component } from "react";
import { Route, Routes} from 'react-router-dom'

import PageNotFound from "../views/NotFound";
import User from "../views/User";
import Submit from "../components/post/Submit";
import SubmissionList from "../views/SubmissionListPage";
import UserComments from "../views/CommentListPage";
import PostComentListPage from "../views/PostComentListPage";
import CommentPost from "../views/CommentPostPage";

class AppRouter extends Component{

  render(){

    return(
      <>
        <Routes>
            <Route path="/" element={<SubmissionList type='vote' />} />
            <Route path="/profile/:userId" element={<User />}></Route>
            <Route path="/submit" element={<Submit/>}> </Route>
            <Route path='/new' element={<SubmissionList type='new' />} />
            <Route path='/ask' element={<SubmissionList type='ask' />} /> 
            <Route path='/usercomments/:userId' element={<UserComments/>}> </Route>
            <Route path='/upvotecomments/:userId' element={<UserComments type="upvoted"/>}> </Route>
            <Route path='/submissions/:postId/comments' element={<PostComentListPage />}></Route>
            <Route path='/makepostcomment/:posId' element={<CommentPost/>}> </Route>
            <Route element={PageNotFound} />
        </Routes>
      </>
    )
  }
}

export default AppRouter;