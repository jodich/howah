import React from 'react';
import { Link } from 'react-router-dom'


export default class Posts extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('all post did mount');

        // var elem = document.querySelector('.all-posts .row');
        // var msnry = new Masonry( elem, {
        //     transitionDuration: '0.2s',
        // });
    }

    componentDidUpdate() {
        console.log('all post did update');

        // var elem = document.querySelector('.all-posts .row');
        // var msnry = new Masonry( elem, {
        //     transitionDuration: '0.2s',
        // });

    }

    render() {
        const { posts } = this.props

        var allPosts = posts.map( (post, index) => {
            
            if (post.question_image) {
                var image = <img src={post.question_image}/>
            }

            return (
                <div className="col s12 m3" key={index}>
                <Link to={"/posts/" + post.id} >
                <div className="card">
                    <div className="card-image">
                        {image}
                    </div>
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
            <div className="container-fluid posts">
            <div className="all-posts">
                <div className="row">
                    {allPosts}
                </div>
            </div>
            </div>
        )
    }
}