import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.scss';

export default class NavBar extends React.Component {

    constructor() {
        super();
    }
    
    componentDidMount() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
    }

    render() {

        return(
            <nav>
                <div className="nav-wrapper">
                    <div className="container">
                        <Link to='/' className="brand-logo center">HOW AH?</Link>
                        <Link to="#" data-target="mobile-nav" className="sidenav-trigger"><i className="material-icons">:::</i></Link>
                        <ul className="left hide-on-med-and-down">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/posts'>Browse</Link></li>
                            <li><Link to='/new-post'>New Post</Link></li>
                        </ul>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to='/profile'>Profile</Link></li>
                            <li><Link to='/signup'>Sign Up</Link></li>
                            <li><Link to='/login'>Log In</Link></li>
                            <li><Link to='/' onClick={this.props.logoutHandler}>Logout</Link></li>
                        </ul>
                    </div>
                </div>
            
                <ul className="sidenav" id="mobile-nav">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/posts'>Browse</Link></li>
                    <li><Link to='/new-post'>New Post</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to='/signup'>Sign Up</Link></li>
                    <li><Link to='/login'>Log In</Link></li>
                    <li><Link to='/' onClick={this.props.logoutHandler}>Logout</Link></li>
                </ul>
            </nav>
        )
    }
}
