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
        <NamedLink className="searchLink" name="BlogPostPage" params={{ id, slug }}> 

            <h1 className="heading">{title}</h1>
            <div className="imageWrapper">
              <div className="aspectWrapper">
                <img className="image" src={imgUrl} className="searchImage"/>
              </div>
            </div>
            <p>{summary}</p>
            <div className="linkText">      
              <h4>Written by: {author}</h4>
            </div>
        </NamedLink>
      );
    };
      
    export default Post;