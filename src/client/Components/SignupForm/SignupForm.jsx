import React from 'react';
import styles from './style.scss'
import { Redirect } from 'react-router-dom'


export default class SignupFrom extends React.Component {
    constructor() {
        super();
        this.state = {
            name: null,
            password: null,
            cmfpassword: null,
            email: null,
            message: ''
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.submitSignupHandler = this.submitSignupHandler.bind(this)
    }

    changeHandler(event) {
        let text = event.target.value
        let field = event.target.id
        this.setState( {[field]: text} )
    }

    submitSignupHandler(event) {
        event.preventDefault();
        const opts = {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({...this.state})
          }
        fetch('/api/submit-new-user', opts)
            .then(apiResponse => apiResponse.json())
            .then(apiData => {
                this.props.loginHandler(apiData)
                this.setState({
                    message: apiData.message
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {

        const { redirectLogin } = this.props
        if (redirectLogin) {
            return <Redirect to='/profile' />
        }

        return(
        <div className="row signup">
            <form className="col s6 offset-s3" onSubmit={this.submitSignupHandler}>
                <div className="row">
                    <div className="input-field col s6">
                    <input id="name" type="text" className="validate" onChange={this.changeHandler} required/>
                    <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field col s6">
                    <input id="email" type="email" className="validate" onChange={this.changeHandler} required/>
                    <label htmlFor="email">Email</label>
                    <span className="helper-text" data-error="Incorrect email format"></span>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                    <input id="password" type="password" className="validate" onChange={this.changeHandler} minLength="6" required/>
                    <label htmlFor="password">Password</label>
                    <span className="helper-text" data-error="Min 6 Characters"></span>
                    </div>
                    <div className="input-field col s6">
                    <input id="cmfpassword" type="password" className="validate" onChange={this.changeHandler} minLength="6" required/>
                    <label htmlFor="cmfpassword">Confirm Password</label>
                    <span className="helper-text" data-error="Incorrect password length"></span>
                    </div>
                </div>
                <div className="row center">
                    {this.state.message}
                </div>
                <div className="row center">
                    <button className="btn waves-effect waves-light center" type="submit" name="action" >Submit</button>
                </div>
            </form>
        </div>
        )
    }
}