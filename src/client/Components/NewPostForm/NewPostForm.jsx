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

            hasPerformedAjax: false,
            postId: null,
            count: 2
        }
        this.changeFileHandler = this.changeFileHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.addOption = this.addOption.bind(this)
        this.minusOption = this.minusOption.bind(this)
    }

    componentDidMount() {
        console.log('new post component has mounted');

        let futureDate = ''
        let today = new Date();
        let year = today.getFullYear() + 1;
        let month = today.getMonth();
        let date = today.getDate();
        futureDate = `${year}-${month}-${date}`

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
            },
            minDate: today,
            maxDate: new Date(futureDate)
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
            postId: null,
            count: 2
        })
    }

    changeHandler(event) {
        let text = event.target.value
        let field = event.target.id
        this.setState( {[field]: text} )
    }

    changeFileHandler(event) {
        let file = event.target.files[0]
        let field = event.target.id
        this.setState( {[field]: file} )
    }

    componentDidUpdate() {
        console.log(this.state)
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

    addOption() {
        let count = this.state.count
        count = count + 1
        this.setState( { count: count } )
    }

    minusOption() {
        let count = this.state.count
        
        let inputField = `option_${count}`
        let fileField = `file-option_${count}`

        delete this.state[inputField]
        delete this.state[fileField]
        // Deleting directly from STATE, WHICH IS BAD. SOS
        
        count = count - 1
        this.setState( {count: count} )
    }

    render() {
        var {loggedIn} = this.props
        var {hasPerformedAjax, postId, count} = this.state

        // if (!loggedIn) {
        //     return <Redirect to='/app/login' />
        // }

        var allOptionsDOM = [];
        for ( let i = 1; i < count + 1; i++ ) {
            allOptionsDOM.push(
                <div className="row opt" id={`opt-${i}`}>
                    <div className="input-field col s7">
                        <textarea id={`option_${i}`} className="option_0 validate materialize-textarea" onChange={this.changeHandler} required/>
                        <label htmlFor={`option_${i}`}>{`Option ${i}`}</label>
                    </div>
                    <div class="file-field input-field col s5">
                        <div class="btn">
                            <span>File</span><input id={`file-option_${i}`} type="file" onChange={this.changeFileHandler} />
                        </div>
                        <div class="file-path-wrapper">
                            <input class={`file-path option_${i}`} type="text"/>
                        </div>
                    </div>
                </div>
            )
        }

        if (count > 2) {
            var minusBtn = 
            <div className="row">
                <div className="col s12 center">
                    <div className="btn-floating btn-large waves-effect waves-light red" onClick={this.minusOption}>
                        <i className="material-icons">clear</i>
                    </div>
                </div>
            </div>
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

            <div className="row">
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

                    {allOptionsDOM}

                    <div className="row">
                        <div className="col s12 center">
                        <div className="btn-floating btn-large waves-effect waves-light " onClick={this.addOption}>
                            <i className="material-icons">add</i>
                        </div>
                        </div>
                    </div>

                    {minusBtn}

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
                            <span class="helper-text">max duration is one year</span>
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