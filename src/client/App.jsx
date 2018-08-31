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
            loggedIn: true,
            user: {id: 1, user_name: "Jodi", email: "jodi_choo@hotmail.com", password: "c14758dbf2d47ec5511fa42ca83f88d04ad78c5cb27990114b372baea8869753"},
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
            <header key="h">
                <NavBar loggedIn={this.state.loggedIn} logoutHandler={this.logoutHandler} />
            </header>,

            <main key="m">
                <Switch>
                    {/* Public Routes */}
                    <Route exact path='/' render={()=><Home />}/>
                    <Route path='/signup' render={()=><SignupFrom loginHandler={this.loginHandler} redirectLogin={redirectLogin} />} />
                    <Route path='/login' render={()=><LoginForm loginHandler={this.loginHandler} redirectLogin={redirectLogin} />} />
                    <Route path='/posts' render={()=><Posts loggedIn={loggedIn} user={user} />} />

                    {/* Private Routes */}
                    <Route path='/profile' render={()=><ProfilePage loggedIn={loggedIn} user={user} />} />
                    <Route path='/new-post' render={()=><NewPostForm loggedIn={loggedIn} user={user} />} />
                    {/* <Redirect from="/" to=""/> */}
                </Switch>
            </main>,
            
            <footer key="f">
                <StickyFooter/>
            </footer>
        ]

        );
    }
}