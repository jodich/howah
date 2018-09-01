import React from 'react';
import styles from './style.scss';
import {Zoom} from 'react-reveal';
import { Link } from 'react-router-dom'


export default class Comments extends React.Component {
    constructor() {
        super();
        this.state = {
            allComments: [],
            commentInput: null,

            userId: null,

            commentsLength: 0,
            hasMore: true,
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.loadComments = this.loadComments.bind(this);

        window.onscroll = () => {
            if (!this.state.hasMore) return;

            if (
              window.innerHeight + document.documentElement.scrollTop
              === document.documentElement.offsetHeight
            ) {
                this.loadComments()
            }
        };
    }

    componentDidMount() {
        console.log('the props in comments', this.props)
        if (this.props.loggedIn) {
            this.setState( {userId: this.props.user.id} )
        }
        this.loadComments();
    }

    // componentDidUpdate() {
    //     console.log(this.state)
    // }

    loadComments() {
        let {commentsLength, hasMore} = this.state
        commentsLength = commentsLength + 10;
        
        fetch(`/api/posts/${this.props.post.id}/comments?length=${commentsLength}`)
        .then(apiResponse => apiResponse.json())
        .then(apiData => {
            hasMore = apiData.result.length < commentsLength ? false : true
            this.setState({ allComments: apiData.result, commentsLength: commentsLength, hasMore: hasMore});
        })
    }

    changeHandler(event) {
        let text = event.target.value
        let field = event.target.id
        this.setState( { [field]: text } )
    }

    submitHandler(event) {
        event.preventDefault();

        let {allComments} = this.state

        const opts = {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({...this.state})
            }
              fetch(`/api/posts/${this.props.post.id}/submit-new-comment`, opts)
                .then(apiResponse => apiResponse.json())
                .then(apiData => {
                    // allComments.unshift(apiData.newComment)
                    // this.setState({ allComments: allComments});
                    this.loadComments();
                })
                
        document.querySelector("#commentForm").reset();
    }

    render() {

        if (this.props.loggedIn) {
            var commentForm = 
            <form id="commentForm" onSubmit={this.submitHandler}>
                <div className="input-field col s12 m2">
                    <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
                </div>
                <div className="input-field col s12 m10">
                    <textarea id="commentInput" className="materialize-textarea validate" onChange={this.changeHandler}></textarea>
                    <label htmlFor="commentInput">Comment</label>
                </div>
            </form>
        } else {
            var commentForm = 
            <div className="col s12">
                <div className="notloggedin">Must be <Link to="/login">logged in</Link> to comment</div>
            </div>
        }

        const allComments = this.state.allComments.map( (comment, index) => {

            let createdDated = comment.created_at.split('.')
            let date = createdDated[0].split('T')[0].split('-').reverse().join('/')
            let time = createdDated[0].split('T')[1].slice(0, 5)

            return (
                <Zoom duration={300} key={index}>
                <div className="col s12">
                    <div className="card">
                    <div className="card-content">
                        <p>{comment.content}</p>

                        <p className="right-align grey-text text-lighten-1">
                            <i>Posted By:</i> {comment.user_name} ({comment.email})<br/>
                            <i>on</i> {time} {date}
                        </p>

                    </div>
                    </div>
                </div>
                </Zoom>
            )
        })

        return(
        <div className="row comments">
            <div className="col s12 m10 offset-m1">
                <h6 className="center">Comments</h6>
                    {commentForm}

                    {allComments}
            </div>
        </div>
        )
    }
}