import React from 'react';
import styles from './style.scss'
import { Redirect } from 'react-router-dom'


export default class ProfilePage extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        // look for posts that belongs to the user
    }

    render() {
        const {user, loggedIn} = this.props

        if (!loggedIn) {
            return <Redirect to='/login' />
        }

        return(
            <div className="container">
                <div className="row">
                    <div className="col s12 m12">
                        <p>Profile Page</p>
                        <div className="card horizontal">
                        <div className="card-image">
                            <img height="130" src="https://www.incipioworks.com/wp-content/uploads/2015/07/profile-picture-placeholder.png" />
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                            <p>{user.user_name}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col m4">
                        <div class="card">
                            <div class="card-content">
                            <span class="card-title">Details</span>
                            <p>I am a very simple card. I am good at containing </p>
                            </div>
                        </div>
                    </div>
                    <div className="col m8">
                        <div class="card">
                            <div class="card-content">
                            <span class="card-title">Post feed</span>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie erat sit amet efficitur tincidunt. Vestibulum quis venenatis ex, eu sodales quam. Aliquam eget purus aliquet, porttitor tortor et, laoreet magna. Praesent sodales venenatis nibh at imperdiet. Duis et ultricies felis. Integer magna augue, mollis vel porttitor et, porttitor a magna. Quisque sed nisi porttitor, porttitor est in, sagittis dolor. Integer id cursus felis, sed bibendum neque. Nam scelerisque nulla sem, eget pellentesque velit gravida non. Pellentesque fringilla nisl sed scelerisque mattis.
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}