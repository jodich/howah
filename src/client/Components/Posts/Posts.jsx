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
            maxImages: 0,
            postLimit: 0,
            hasMore: true
        }
        window.onscroll = () => {
            if (!this.state.hasMore) return;

            if (
              window.innerHeight + document.documentElement.scrollTop
              === document.documentElement.offsetHeight
            ) {
                this.loadMore()
            }
        };
    }

    componentDidMount() {
        this.loadMore();
    }
    
    loadMore = () => {
        let {maxImages, postLimit, hasMore} = this.state
        maxImages = 0
        postLimit = postLimit + 50;
        fetch(`/api/posts?limit=${postLimit}`)
        .then(apiResponse => apiResponse.json())
        .then(apiData => {
            let posts = apiData.postsArr

            hasMore = posts.length < postLimit ? false : true

            for (let i = 0; i < posts.length; i++) {
                if (posts[i].question_image) {
                    maxImages = maxImages + 1;
                }
            }
            this.setState( {posts, maxImages: maxImages, postLimit: postLimit, hasMore: hasMore} );

            // have to put this here in case newly loaded stuff have no images
            var elem = document.querySelector('.row');
            var msnry = new Masonry( elem, {
                transitionDuration: '0.2s',
                horizontalOrder: true
            });
        })
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