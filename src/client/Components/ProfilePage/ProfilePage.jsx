import React from 'react';
import styles from './style.scss'
import { Redirect } from 'react-router-dom'


export default class ProfilePage extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        const {user, loggedIn} = this.props

        if (!loggedIn) {
            return <Redirect to='/login' />
        }

        return(
            <div className="container">
                <p>Hello {user.user_name}, Profile Page</p>
            </div>
        )
    }
}