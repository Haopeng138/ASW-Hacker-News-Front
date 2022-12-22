import React, { Component } from "react";
import { Route, Routes} from 'react-router-dom'

import PageNotFound from "../views/NotFound";
import User from "../views/User";
import Submit from "../components/post/Submit";
import SubmissionList from "../views/SubmissionListPage";
import commentBanner from "../components/comments/commentBanner";
import userPosts from "../views/userPosts";

class AppRouter extends Component{

  render(){

    return(
      <>
        <Routes>
            <Route path="/" element={<SubmissionList type='vote' />} />
            <Route path="/profile" element={<User />}></Route>
            <Route path="/submit" element={<Submit/>}> </Route>
            <Route path='/new' element={<SubmissionList type='new' />} />
            <Route path='/ask' element={<SubmissionList type='ask' />} />
            <Route path='/userPosts/:userId' element={<userPosts type='normal' />} />
            <Route path='/userPosts/:userId' element={<userPosts type='vote' />} />
            <Route path='/comment' element={<commentBanner />}> <Route/>
            <Route element={PageNotFound} />
        </Routes>
      </>
    )
  }
}

export default AppRouter;