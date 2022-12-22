import React, {Component} from 'react';
import Upvote from '../global/upvote.png'
import APIservice from '../service/APIservice';

export default class UpvoteButton extends Component{

  constructor(props){
    super(props);
    this.state = {
      type: props.type,
      id: props.id
    }
    this.onClick = this.onClick.bind(this)
    this.pathFromType = this.pathFromType(this)
  }

  pathFromType(){
    if(this.state.type==='comment') return 'comments/'
    return 'submissions/'
  }

  onClick(event){
    console.log('Click!')
    var path = this.pathFromType
    APIservice.put(this.pathFromType+this.state.id+'/vote').then( (response) => {
      this.props.update()
    })
  }

  render() {

    return (
      <button onClick={this.onClick} >
        <img src={Upvote} style={{bg:null, width:'10px', height:'10px', border:'0px', margin:'3px 2px 6px'}} />
      </button>
    )
  }
}