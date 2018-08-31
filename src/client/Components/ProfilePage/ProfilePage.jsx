import React from 'react';
import styles from './style.scss'
import { Redirect } from 'react-router-dom'
import {Zoom} from 'react-reveal';
import { Link } from 'react-router-dom'


export default class ProfilePage extends React.Component {
    constructor() {
        super();
        this.state = {
            userPosts: [],
            postLength: 0,
            hasMore: true,
            sortBy: 'none'
        }
        this.sortByQuery = this.sortByQuery.bind(this)
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
        this.loadMore()
    }

    loadMore = ()  => {

        let {postLength, hasMore, sortBy} = this.state
        postLength = postLength + 10;

        fetch(`/api/userposts?length=${postLength}&sortby=${sortBy}`)
        .then(apiResponse => apiResponse.json())
        .then(apiData => {
            hasMore = apiData.posts.length < postLength ? false : true
            this.setState({userPosts: apiData.posts, postLength: postLength, hasMore: hasMore})
        })
    }

    sortByQuery = (query, event) => {
        fetch(`/api/userposts?length=10&sortby=${query}`)
        .then(apiResponse => apiResponse.json())
        .then(apiData => {
                this.setState({userPosts: [], sortBy: query, hasMore: true, postLength: 0});
                this.loadMore();
        })

        if (document.querySelectorAll('.active')[0]) {
            document.querySelectorAll('.active')[0].classList.remove('active');
        }

        event.target.classList.toggle('active');
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
                        {post.question}<br/>
                        deadline<br/>
                        date: {date}<br/>
                        time: {time}
                    </div>
                    <div className="card-action">
                    <Link to={`/posts/${post.id}`}>See More</Link>
                    </div>
                </div>
                </Zoom>
            )
        })


        return(
            <div className="container profile">
                <div className="row">
                    <div className="col m4">
                        <div className="card">
                            <div className="card-image">
                            <img src="https://www.incipioworks.com/wp-content/uploads/2015/07/profile-picture-placeholder.png" />
                            <span className="card-title">{user.user_name}</span>
                            </div>
                            <div className="card-content">
                            <p>{user.user_name}</p>
                            <p>{user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col m8">
                    <div className="card">
                        <ul class="tabs">
                            <li class="tab col s3" onClick={(event) => this.sortByQuery('recent', event)}><a href="#default" className="active" >Recent</a></li>
                            <li class="tab col s3" onClick={(event) => this.sortByQuery('oldest first', event)}><a href="#old">Oldest</a></li>
                            <li class="tab col s3" onClick={(event) => this.sortByQuery('open', event)}><a href="#open">Open</a></li>
                            <li class="tab col s3" onClick={(event) => this.sortByQuery('closed', event)}><a href="#closed">Closed</a></li>
                        </ul>
                    </div>
                        {allUserPost}
                    </div>
                </div>
            </div>
        )
    }
}