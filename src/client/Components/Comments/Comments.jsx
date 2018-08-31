import React from 'react';
import styles from './style.scss'


export default class Comments extends React.Component {
    constructor() {
        super();
        this.state = {
            allComments: [],
            commentInput: null,

            userId: null
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this)
        this.loadComments = this.loadComments.bind(this)

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
        fetch(`/api/posts/${this.props.post.id}/comments`)
        .then(apiResponse => apiResponse.json())
        .then(apiData => {
            console.log(apiData.result)
            this.setState({ allComments: apiData.result});
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

        const allComments = this.state.allComments.map( (comment, index) => {

            let createdDated = comment.created_at.split('.')
            let date = createdDated[0].split('T')[0].split('-').reverse().join('/')
            let time = createdDated[0].split('T')[1].slice(0, 5)

            return (
                <div className="col s12">
                    <div className="card">
                    <div className="card-content">
                        <p>{comment.content}</p>

                        <p className="right-align">
                            <i>Posted By:</i> {comment.user_name} ({comment.email})<br/>
                            <i>on</i> {time} {date}
                        </p>

                    </div>
                    </div>
                </div>
            )
        })

        return(
        <div className="row comments">
            <div className="col s12 m10 offset-m1">
                <h6 className="center">comments</h6>
                <form id="commentForm" onSubmit={this.submitHandler}>
                    <div className="input-field col s12 m2">
                        <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
                    </div>
                    <div className="input-field col s12 m10">
                        <textarea id="commentInput" className="materialize-textarea validate" onChange={this.changeHandler}></textarea>
                        <label htmlFor="commentInput">Comment</label>
                    </div>
                </form>

                    {allComments}
            </div>
        </div>
        )
    }
}