import React from 'react';
import { Link } from 'react-router-dom';

import Comments from '../Comments/Comments'

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            options: [],
            hasPerformedAjax: false,

            message: false
        }
        this.clickHandler = this.clickHandler.bind(this)
    }

    componentDidMount() {
        // console.log('post component did mount')

        let postId = this.props.match.params.id;
        let url = `/api/posts/${postId}`

        fetch(url)
          .then(apiResponse => apiResponse.json())
          .then(apiData => {
            //   console.log(apiData.options)
              this.setState( {post: apiData.post, options: apiData.options, hasPerformedAjax: true} )
          });
    }

    componentDidUpdate() {
        // console.log('post component did an update')
        var elems = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(elems, {});
    }

    clickHandler(event) {
        event.preventDefault();
        let postId = this.props.match.params.id        
        let optionId = event.target.id

        if (!this.props.loggedIn) {
            this.setState( {message: 'You have to log in to vote!'} );
        } else {
            console.log('you have clicked the vote button of option id:', optionId);
            let url = `/api/posts/${postId}/option/${optionId}`

            const opts = {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({...this.state})
            }

            fetch(url, opts)
                .then(apiResponse => apiResponse.json())
                .then(apiData => {
                    if (apiData.status) {
                        let newOptionsArr = this.state.options.slice()
                        console.log(newOptionsArr)
                        let selectedOption = newOptionsArr.find( obj => obj.id == apiData.updatedOption.id);
                        selectedOption.points = apiData.updatedOption.points;
                        console.log(newOptionsArr)
                        this.setState( {message: apiData.message, options: newOptionsArr } )
                    } else {
                        this.setState( {message: apiData.message} )
                    }
                })
                .catch((error) =>{
                    console.error(error);
                });
        }
    }

    render() {
        // holder for when the ajax has not been performed yet 
        var {post, options, hasPerformedAjax} = this.state
        if (!hasPerformedAjax) {
            return (
                <div></div>
            )
        }

        // upon clicking the vote.. what returns?
        if (this.state.message) {
            var errMessage = <div className="message teal">
                                {this.state.message}
                            </div>
        }

        // setting up the styling for the deadline
        var ageKeys = Object.keys(post.age);
        var duration = ageKeys.map( (key, index) => {
            return(
                <div key={index} className="row">
                    <div className="cir z-depth-2">
                        {post.age[key]}
                    </div>
                    <div>
                        {key}
                    </div>
                </div>
            )
        })

        // setting up the styling for the options
        const allOptions = options.map( (option, index) => {
            var optionContent;
            if (option.option_image == 'null' ) {
                optionContent = 
                <div className="col s12 m12 ">
                    {option.option}
                </div>
            } else if (option.option == 'null') {
                optionContent = 
                <div className="col s12 m12 ">
                    <img className="materialboxed" src={option.option_image} />
                </div>
            } else {
                optionContent = 
                <span>
                    <div className="col s12 m12 ">
                        <img className="materialboxed" src={option.option_image} />
                    </div>
                    <div className="col s12 m12 ">
                        {option.option}
                    </div>
                </span>
            }

            return(
                [
                <div key="text" className="row option-text">
                    {optionContent}
                </div>,
                <div key="poll" className="row option-poll">
                    <div className="col s9 m9 points center-align lighten-2">
                        {option.points}
                    </div>
                    <div className="col s3 m3 vote center-align teal waves-effect waves-light btn" id={option.id} onClick={ this.clickHandler }>
                        VOTE                     
                    </div>
                </div>
                ]
            )
        });

        // if the post has an image or not
        if (post.question_image) {
            var qnImage = <img className="materialboxed" src={post.question_image} id="qn"/>
        }

        return(
            <div className="container posts">
            <div className="row post">
                <div className="col s12 m10 offset-m1 center">
                    <Link to="/posts">Back</Link>
                </div>
            </div>
            <div className="row post">
                <div className="col s12 m10 offset-m1">
                    <p className="center-align">Title: {post.title}</p>
                    <h6>Question:</h6>
                    {qnImage}
                    <div className="question">{post.question}</div>
                </div>
            </div>
            <div className="row post">
                <div className="col s12 m6 offset-m1 options">
                    {errMessage}
                    {allOptions}
                </div>
                <div className="col s12 m4 duration center">
                    <h6>Time's Up in ...</h6>
                    {duration}
                </div>
            </div>
            <div className="row post">
                <div className="col s12 m10 offset-m1 center">
                    <Link to="/posts">Back</Link>
                </div>
            </div>
            <Comments post={this.state.post} user={this.props.user} loggedIn={this.props.loggedIn}/>
            <div className="row post">
                <div className="col s12 m10 offset-m1 center">
                    {/* <Link to="#top">Back</Link><br/> */}
                    <a href='#'>Back to Top</a>
                </div>
            </div>
            </div>
        )
    }
}