import React from 'react';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';


export default class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            maxImages: 0,
            imageCount: 0
        }
        this.imageHasLoaded = this.imageHasLoaded.bind(this);
        this.allImagesLoaded = this.allImagesLoaded.bind(this);
    }

    imageHasLoaded() {
        // console.log('image have loaded')
        let imageCount = this.state.imageCount;
        imageCount = imageCount + 1;

        if (imageCount == this.props.maxImages) {
            this.allImagesLoaded(true)
            this.setState( {imageCount: 0})
        } else {
            this.setState( {imageCount: imageCount} )
        }
    }

    allImagesLoaded(el) {
        if (el) {
            var elem = document.querySelector('.row');
            var msnry = new Masonry( elem, {
                transitionDuration: '0.2s',
                horizontalOrder: true
            });
        }
    }

    render() {
        const { posts } = this.props

        var allPosts = posts.map( (post, index) => {
            
            if (post.question_image) {
                var image = <img src={post.question_image} onLoad={this.imageHasLoaded}/>
            }

            return (
                <Zoom duration={500} key={index}>
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
                </Zoom>

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