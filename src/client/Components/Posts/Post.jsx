import React from 'react';
import { Link } from 'react-router-dom'


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
        console.log('post component did mount')

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
        console.log('post component did an update')
    }

    componentWillUnmount() {
        this.setState ({
            post: {},
            options: [],
            hasPerformedAjax: false,

            message: false
        })
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

        var {post, options, hasPerformedAjax} = this.state
        if (!hasPerformedAjax) {
            return (
                <div></div>
            )
        }

        if (this.state.message) {
            var errMessage = <div className="message teal">
                                {this.state.message}
                            </div>
        }

        var ageKeys = Object.keys(post.age);
        var duration = ageKeys.map( (key, index) => {
            return(
                <div key={index} className="row">
                    <div className="cir">
                        {post.age[key]}
                    </div>
                    <div>
                        {key}
                    </div>
                </div>
            )
        })

        const allOptions = options.map( (option, index) => {
            return(
                [
                <div key="text" className="row option-text">
                    <div className="col s12 m12 ">
                        {option.option}
                    </div>
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


        return(
            [
            <div key="back-1" className="row post">
                <div className="col s12 m10 offset-m1 center">
                    <Link to="/app/posts">Back</Link>
                </div>
            </div>,
            <div key="qn" className="row post">
                <div className="col s12 m10 offset-m1">
                    <p className="center-align">Title: {post.title}</p>
                    <h6>Question:</h6>
                    <h4>{post.question}</h4>
                </div>
            </div>,
            <div key="bulk" className="row post">
                <div className="col s12 m6 offset-m1 options">
                    {errMessage}
                    {allOptions}
                </div>
                <div className="col s12 m4 duration center">
                    <h6>Time's Up in ...</h6>
                    {duration}
                </div>
            </div>,
            <div key="back-2" className="row post">
                <div className="col s12 m10 offset-m1 center">
                    <Link to="/app/posts">Back</Link>
                </div>
            </div>
            ]
        )
    }
}