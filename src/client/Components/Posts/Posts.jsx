import React from 'react';
import styles from './style.scss'
import { Switch, Route, Link } from 'react-router-dom'
import AllPosts from './AllPosts.jsx'
import Post from './Post.jsx'


export default class Posts extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        console.log('posts component mounted')
        fetch('/api/posts')
          .then(apiResponse => apiResponse.json())
          .then(apiData => {
            this.setState( {posts: apiData.result} )
          })
    }

    componentDidUpdate() {
        console.log('posts component did an update');
        var elem = document.querySelector('.all-posts .row');
        var msnry = new Masonry( elem, {
            transitionDuration: '0.2s',
        });
    }


    render() {

        return(
            <div className="container-fluid posts">
                <Switch>
                    <Route path='/posts/:id' render={ (props)=><Post {...this.props} match={props.match}/> } />
                    <Route path='/posts' render={ ()=><AllPosts hello={this.hello} posts={this.state.posts}/> } />
                </Switch>
            </div>
        )
    }
}