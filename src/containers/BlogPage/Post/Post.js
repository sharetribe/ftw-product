import React, { Component } from 'react';

import { createSlug } from '../../../util/urlHelpers';
import { AspectRatioWrapper, NamedLink, ResponsiveImage } from '../../../components';
import { lazyLoadWithDimensions } from '../../../util/contextHelpers';

import "./Post.css";

class BlogImage extends Component {
  render() {
    return <ResponsiveImage {...this.props} />;
  }
}

const LazyImage = lazyLoadWithDimensions(BlogImage, { loadAfterInitialRendering: 3000 });

// First param should be title in named link
const Post = ({ post: { title, summary,
    imgUrl, author }, index, datePublished }) => {
      const slug = createSlug(title);
      const id = index;
      return (  
        <NamedLink className="post-container" name="BlogPostPage" params={{ id, slug }}> 

          <div className="post-container" name="BlogPostPage" >
            <h1 className="heading">{title}</h1>
            <img className="image" src={imgUrl} alt="post" />
            <p>{summary}</p>
            <div className="info">      
              <h4>Written by: {author}</h4>
            </div>
          </div>
        </NamedLink>
      );
    };
      
    export default Post;