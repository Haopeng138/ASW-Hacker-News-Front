import React, { Component } from "react";


export default class PostBanner extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            submission: props.submission
        }
    }

    render()
    { 
        console.log(this.state)
        const {submission} = this.state
        return(
        <li key={submission.id}>
            <table border='0' cellPadding='0' cellSpacing='0'>
                <tr>
                    <td valign="top" className="votelinks">
                        <center> 
                            <a id={submission.id}> 
                            <div className="votearrow" title='upvote'> </div>
                            </a>
                        </center>
                    </td>
                    <td className="title">
                        <a href={'/submission/'+submission.id} style={{ color: 'black', textDecoration: 'none' }} >{submission.title} </a>
                        {submission.site != null && <a href={submission.url} className="sitetext"> {' ('+submission.site+')'} </a>}
                    </td>
                </tr>
                <tr>
                    <td colSpan='1' />
                    <td>
                        <span className='subline'>
                        <span className='votes'>{submission.votes} points by </span>
                        <a href={'/profile/' + submission.user.id}> {submission.user.username}</a> {submission.time_from_post} | {submission.numComments} comments
                    </span>
                    </td>
                </tr>
                <tr className="spacer" style={{height: '5px'}}></tr>
            </table>
        </li>) 
    }
}