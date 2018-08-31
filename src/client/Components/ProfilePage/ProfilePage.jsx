import React from 'react';
import styles from './style.scss'
import { Redirect } from 'react-router-dom'
import {Zoom} from 'react-reveal';


export default class ProfilePage extends React.Component {
    constructor() {
        super();
        this.state = {
            userPosts: [],
            postLength: 0,
            hasMore: true,
            sortBy: 'recent'
        }
        this.sortByQuery = this.sortByQuery.bind(this)
        window.onscroll = () => {
            if (!this.state.hasMore) return;

            if (
              window.innerHeight + document.documentElement.scrollTop
              === document.documentElement.offsetHeight
            ) {
                console.log('reached max')
                this.loadMore()
            }
        };
    }

    componentDidMount() {
        this.loadMore()
    }

    componentDidUpdate() {
        console.log('profile did an upate')
        console.log(this.state);
    }

    loadMore = ()  => {

        let {userPosts, postLength, hasMore, sortBy} = this.state
        console.log('before fetch', postLength)
        postLength = postLength + 10;

        fetch(`/api/userposts?length=${postLength}&sortby=${sortBy}`)
        .then(apiResponse => apiResponse.json())
        .then(apiData => {
            
            if (apiData.posts.length < postLength) {
                hasMore = false;
            } else {
                hasMore = true;
            }
            
            console.log('new post length', postLength)
            this.setState({userPosts: apiData.posts, postLength: postLength, hasMore: hasMore})
        })
    }

    sortByQuery = (query) => {
        fetch(`/api/userposts?length=10&sortby=${query}`)
        .then(apiResponse => apiResponse.json())
        .then(apiData => {
                this.setState({userPosts: [], sortBy: query, hasMore: true, postLength: 0});
                this.loadMore();
        })
    } 

    render() {
        const {user, loggedIn} = this.props

        if (!loggedIn) {
            return <Redirect to='/login' />
        }

        var allUserPost = this.state.userPosts.map( (post, index) => {

            let deadline = post.deadline.split('.')
            let date = deadline[0].split('T')[0].split('-').reverse().join('/')
            let time = deadline[0].split('T')[1].slice(0, 5)
        
            return (
                <Zoom duration={index == 0 ? 0 : 800} key={index}>
                <div className="card headline" >
                    <div className="card-content">
                        <span className="card-title">{post.title}</span>
                        {index}<br/>
                        {post.question}<br/>
                        deadline<br/>
                        date: {date}<br/>
                        time: {time}
                    </div>
                </div>
                </Zoom>
            )
        })


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
                            <p>{user.email}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col m4">
                            <div className="collection">
                                <div onClick={() => this.sortByQuery('recent')} className="collection-item">Recent</div>
                                <div onClick={() => this.sortByQuery('open')} className="collection-item">Open</div>
                                <div onClick={() => this.sortByQuery('closed')} className="collection-item">Closed</div>
                            </div>
                    </div>
                    <div className="col m8">
                        {allUserPost}
                    </div>
                </div>
            </div>
        )
    }
}