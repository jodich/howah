import React from 'react';
import { Link } from 'react-router-dom'


export default class Posts extends React.Component {

    render() {
        const { posts } = this.props
        var allPosts = posts.map( (post, index) => {
            return (
                <div className="col s12 m4" key={index}>
                <Link to={"/app/posts/" + post.id} >
                <div className="card">
                    {/* <div class="card-image"><img src="images/sample-1.jpg" /></div> */}
                    <div className="card-content">
                    <span className="card-title truncate">{post.title}</span>
                    <p className="card-info">{post.question}</p>
                    </div>
                </div>
                </Link>
                </div>
            )
        })

        return(
            <div className="row all-posts">
                {allPosts}
            </div>
        )
    }
}