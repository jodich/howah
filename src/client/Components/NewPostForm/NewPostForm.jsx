import React from 'react';
import styles from './style.scss'
import { Redirect } from 'react-router-dom'
import axios from 'axios';

export default class NewPostForm extends React.Component {
    constructor() {
        super();
        this.state = {
            title: null,
            question: null,
            questionImg: null,
            options: {

            },
            images: {

            },
            time: null,
            date: null,
            userId: null,

            hasPerformedAjax: false,
            postId: null,
            count: 2,
            uploaded: false
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
    
    componentDidUpdate() {
        console.log(this.state)
    }

    changeHandler(event) {
        let text = event.target.value
        let field = event.target.id

        if (event.target.className.includes('option')) {
            let options = this.state.options
            options[field] = text
            this.setState( { options: options } )
        } else {
            this.setState( { [field]: text } )
        }

    }

    changeFileHandler(event) {
        let field = event.target.id
        let images = this.state.images
        let questionImg = this.state.questionImg

        let fd = new FormData();
        fd.append('image', event.target.files[0]);
        document.querySelector(`#${field}_status`).textContent = 'image is uploading...'
        
        axios.post('/api/upload-image', fd)
        .then(apiResponse => {
            // console.log(apiResponse.data) // all the stuff i send over is here
            if (apiResponse.data.uploaded) {
                document.querySelector(`#${field}_status`).textContent = 'Uploaded'
            }

            if (field == "qnImg") {
                questionImg = apiResponse.data.url
                this.setState( {questionImg: questionImg, uploaded: false} )
            } else {
                images[field] = apiResponse.data.url
                this.setState( {images: images, uploaded: false} )
            }
        })
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
        let {count} = this.state
        let options = {...this.state.options};
        let images = {...this.state.images};

        let inputField = `option_${count}`
        let fileField = `image_${count}`

        delete options[inputField]
        delete images[fileField]

        count = count - 1
        this.setState( {count: count, options: options, images: images} );
    }

    render() {
        var {loggedIn} = this.props
        var {hasPerformedAjax, postId, count} = this.state

        if (!loggedIn) {
            return <Redirect to='/login' />
        }

        if (hasPerformedAjax) {
            return <Redirect to={'/posts/' + postId} />
        }

        var allOptionsDOM = [];
        for ( let i = 1; i < count + 1; i++ ) {
            allOptionsDOM.push(
                <div className="row opt" id={`opt-${i}`}>
                    <div className="input-field col s7">
                        <textarea id={`option_${i}`} className="option validate materialize-textarea" onChange={this.changeHandler} required/>
                        <label htmlFor={`option_${i}`}>{`Option ${i}`}</label>
                    </div>
                    <div class="file-field input-field col s5">
                        <div class="btn">
                            <span>Image</span><input id={`image_${i}`} type="file" onChange={this.changeFileHandler} />
                        </div>
                        <div class="file-path-wrapper">
                            <input class={`file-path option_${i}`} type="text" placeholder="optional"/>
                            <span id={`image_${i}_status`} class="helper-text"></span>
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
                        <div class="file-field input-field col s12">
                            <div class="btn">
                                <span>Question Image</span><input id="qnImg" type="file" onChange={this.changeFileHandler} />
                            </div>
                            <div class="file-path-wrapper">
                                <input className="file-path" type="text" placeholder="optional"/>
                                <span id="qnImg_status" class="helper-text"></span>
                            </div>
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