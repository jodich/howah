import React from 'react';
import styles from './style.scss'
import { Redirect } from 'react-router-dom'


export default class NewPostForm extends React.Component {
    constructor() {
        super();
        this.state = {
            title: null,
            question: null,
            option_1: null,
            option_2: null,
            time: null,
            date: null,
            userId: null,

            hasPerformedAjax: false
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    componentDidMount() {
        console.log('new post component has mounted');

        if (this.props.loggedIn) {
            this.setState( {userId: this.props.user.id} )
        }

        var timer = document.querySelectorAll('.timepicker');
        M.Timepicker.init(timer, {
            twelveHour: false,
            onCloseStart: () => {
                let text = timer[0].value
                this.setState( {time: text} )
            }
        });

        var calender = document.querySelectorAll('.datepicker');
        M.Datepicker.init(calender, {
            format: 'dd/mm/yyyy',
            onClose: () => {
                let text = calender[0].value
                this.setState( {date: text} )
            }
        });

    }

    componentWillUnmount() {
        this.setState = ({
            title: null,
            question: null,
            option_1: null,
            option_2: null,
            time: null,
            date: null,
            userId: null,

            hasPerformedAjax: false,
            postId: null
        })
    }

    changeHandler(event) {
        let text = event.target.value
        let field = event.target.id
        this.setState( {[field]: text} )
    }

    submitHandler(event) {
        event.preventDefault();
        const opts = {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({...this.state})
          }
          fetch('/api/submit-new-post', opts)
            .then(apiResponse => apiResponse.json())
            .then(apiData => {
              this.setState({
                hasPerformedAjax: apiData.status,
                postId: apiData.postId
              });
            })
    }

    render() {
        var {user, loggedIn} = this.props
        var {hasPerformedAjax, postId} = this.state

        if (!loggedIn) {
            return <Redirect to='/app/login' />
        }

        if (hasPerformedAjax) {
            return <Redirect to={'/app/posts/' + postId} />
        }

        return(
        <div className="container">
            <h4 className="center">New Post</h4>

            <div className="row">
                <div className="col s8 offset-s2">
                    <p>Hey, there! Are you too busy to make choices on your own? Come on, post a question and let the people decide for you! </p>
                </div>
            </div>

            <div className="row signup">
                <form className="col s8 offset-s2" onSubmit={this.submitHandler}>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="title" type="text" className="validate" onChange={this.changeHandler} required/>
                        <label htmlFor="title">Title</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <textarea id="question" className="materialize-textarea validate" onChange={this.changeHandler} required></textarea>
                        <label htmlFor="question">Question</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="option_1" type="text" className="validate" onChange={this.changeHandler} required/>
                        <label htmlFor="option_1">Option 1</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="option_2" type="text" className="validate" onChange={this.changeHandler} required/>
                        <label htmlFor="option_2">Option 2</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12">
                            <h5>Deadline</h5>
                            <p>Set a deadline for your post!</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="date" type="text" className="datepicker" />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="time" type="text" className="timepicker" />
                            <label htmlFor="time">Time</label>
                        </div>
                    </div>

                    <div className="row center">
                        <button className="btn waves-effect waves-light center" type="submit" name="action" >Submit</button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}