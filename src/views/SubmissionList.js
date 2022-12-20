import React, {Component} from 'react';
import APIservice from '../service/APIservice';
import PostBanner from '../components/post/PostBanner';

export default class SubmissionList extends Component {
    /**
    {   "id": 2,
        "title": "Submission URL",
        "url": "https://prova.cat",
        "site": "prova.cat",
        "text": null,
        "votes": 2,
        "insert_date": "2022-11-25",
        "user": {
            "id": 1,
            "username": "Paco",
            "email": "paco@gmail.com" },
        "numComments": 3,
        "commentIDs": [ 1, 4, 6] }
    */

    constructor(props) {
        super(props);
        this.state = {
            submissions: [],
            loading: true,
            type: props.type,
            submissionList: null
        }
    }

    componentDidMount(){
        var query = ''
        if(this.state.type === 'new'){
            query = '?order_by=insert_date&ascending=false'
        } else if (this.state.type === 'ask'){
            query = '?order_by=insert_date&ascending=false&type=ask'
        }
        console.log('submissions/'+query)
        APIservice.get('submissions/' + query).then(response =>{
            this.setState({
                submissions: response.data,
                loading: false,
                postBanners: response.data.map((submission) => <PostBanner submission={submission} />)
            })
        });
    }

    renderSubmissionList(postBanners){
        console.log(postBanners)
        return(
            <div>
                <ol>
                    {postBanners}
                </ol>
            </div>
        );
    }

    render(){
        const { loading, postBanners } = this.state
        //return (<p> HOLA </p>);
        return(
            loading ?
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
                Cargando ...
            </div>
            :
            this.renderSubmissionList(postBanners)
        );
    }

}