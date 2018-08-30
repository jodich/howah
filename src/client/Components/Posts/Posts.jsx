import React from 'react';
import styles from './style.scss'
import { Switch, Route, Link } from 'react-router-dom'
import AllPosts from './AllPosts.jsx'
import Post from './Post.jsx'


export default class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            posts: [],
            maxImages: 0
        }
    }

    // async getImages() {
    //     console.log('helloooooooooo');
    //     const response = await fetch('/api/posts');
    //     const data = await response.json();
    //     console.log('byeeeeeeeee');
    //     return data.result 
    // }

    componentDidMount() {
        console.log('posts component mounted')
        let maxImages = this.state.maxImages
        fetch(`/api/posts`)
        .then(apiResponse => apiResponse.json())
        .then(apiData => {
            let posts = apiData.postsArr
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].question_image) {
                    maxImages = maxImages + 1;
                }
            }
            this.setState( {posts, maxImages: maxImages} )
        })
    }

    componentDidUpdate() {
        console.log('posts component did an update');
    //     var elem = document.querySelector('.row');
        
    //     var msnry = new Masonry( elem, {
    //         transitionDuration: '0.2s',
    //     });

    //     setTimeout( () => {
    //         msnry.layout();
    //     }, 1000);
    }

    render() {

        return(
            <Switch>
                    <Route path='/posts/:id' render={ (props)=><Post {...this.props} match={props.match}/> } />
                    <Route path='/posts' render={ ()=><AllPosts posts={this.state.posts} maxImages={this.state.maxImages} />  } />
            </Switch>
        )
    }
}