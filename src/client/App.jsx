import React from 'react';
import Home from './Components/Home/Home';
import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

// Components
import SignupFrom from './Components/SignupForm/SignupForm';
import LoginForm from './Components/LoginForm/LoginForm';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import NavBar from './Components/_NavBar/NavBar';
import StickyFooter from './Components/_StickyFooter/StickyFooter';
import NewPostForm from './Components/NewPostForm/NewPostForm';
import Posts from './Components/Posts/Posts';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            user: null,
            redirectLogin: false
        };
        this.loginHandler = this.loginHandler.bind(this)
        this.logoutHandler = this.logoutHandler.bind(this)
    }

    loginHandler(apiData) {
        if (apiData.loginStatus) {
            this.setState( {loggedIn: true, user: apiData.result, redirectLogin: true} )
            console.log('YOU ARE LOGGED IN as', apiData.result.user_name)
        }
    }

    logoutHandler() {
        this.setState( {
            loggedIn: false,
            user: null,
            redirectLogin: false
        } )
    }

    render() {

        var { loggedIn, user, redirectLogin } = this.state

        return (

        [
            <header>
                <NavBar loggedIn={this.state.loggedIn} logoutHandler={this.logoutHandler} />
            </header>,

            <main>
                <Switch>
                    {/* Public Routes */}
                    <Route exact path='/app' render={()=><Home />}/>
                    <Route path='/app/signup' render={()=><SignupFrom loginHandler={this.loginHandler} redirectLogin={redirectLogin} />} />
                    <Route path='/app/login' render={()=><LoginForm loginHandler={this.loginHandler} redirectLogin={redirectLogin} />} />
                    <Route path='/app/posts' render={()=><Posts loggedIn={loggedIn} user={user} />} />

                    {/* Private Routes */}
                    <Route path='/app/profile' render={()=><ProfilePage loggedIn={loggedIn} user={user} />} />
                    <Route path='/app/new-post' render={()=><NewPostForm loggedIn={loggedIn} user={user} />} />
                    <Redirect from="/" to="/app"/>
                </Switch>
            </main>,
            
            <footer>
                <StickyFooter/>
            </footer>
        ]

        );
    }
}