import React from 'react';

import { createSlug } from '../../../util/urlHelpers';
import { AspectRatioWrapper, NamedLink, ResponsiveImage } from '../../../components';

import "./Post.css";

// First param should be title in named link
const Post = ({ post: { title, body,
    imgUrl, author }, index }) => {
      const slug = createSlug(title);
      const id = index;
      return (  
        <NamedLink className="post-container" name="BlogPostPage" params={{ id, slug }}> 
          <h1 className="heading">{title}</h1>
          <img className="image" src={imgUrl} alt="post" />
          <p>{body}</p>
          <div className="info">      
            <h4>Written by: {author}</h4>
          </div>
        </NamedLink>
      );
    };
      
    export default Post;