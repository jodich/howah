import React from 'react';
import styles from './style.scss'
import { Redirect } from 'react-router-dom'


export default class SignupFrom extends React.Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            message: ''
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.submitLoginHandler = this.submitLoginHandler.bind(this)
    }

    changeHandler(event) {
        let text = event.target.value
        let field = event.target.id
        this.setState( {[field]: text} )
    }

    submitLoginHandler(event) {
        event.preventDefault();
        const opts = {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({...this.state})
          }
          fetch('/api/submit-login', opts)
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
            <form className="col s12 m4 offset-m4" onSubmit={this.submitLoginHandler}>
                <div className="row">
                    <div className="input-field col s12 m10 offset-m1">
                    <input id="email" type="email" className="" onChange={this.changeHandler} required/>
                    <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12 m10 offset-m1">
                    <input id="password" type="password" className="" onChange={this.changeHandler} minLength="6" required/>
                    <label htmlFor="password">Password</label>
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