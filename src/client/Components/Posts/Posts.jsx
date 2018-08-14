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
    }

    render() {

        return(
            <div className="container posts">
                <Switch>
                    {/* <Route path='/posts/:id' component={Post} /> */}
                    {/* <Route path='/posts/:id' component={addPropsToRoute(Post, this.props)} /> */}
                    <Route path='/app/posts/:id' render={ (props)=><Post {...this.props} match={props.match}/> } />
                    <Route path='/app/posts' render={ ()=><AllPosts posts={this.state.posts}/> } />
                </Switch>
            </div>
        )
    }
}