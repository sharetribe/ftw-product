import React from "react";
import "./Posts.css";
import Post from "../Post/Post";
import {
    LayoutSingleColumn,
    LayoutWrapperTopbar,
    LayoutWrapperMain,
    LayoutWrapperFooter,
    Footer,
    ExternalLink,
  } from '../../../components';

  import {blogPosts} from './BlogPosts';

  import StaticPage from '../../../containers/StaticPage/StaticPage';
  import TopbarContainer from '../../../containers/TopbarContainer/TopbarContainer';
  

const Posts = () => {  

    return (
        <StaticPage
        title="About Us"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'BlogPage',
          description: 'Blog for The Sorority Swap',
          name: 'Blog page',
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>
  
      <LayoutWrapperMain className="posts-container">
      <div className="posts-container">
      {blogPosts.map((post, index) => (
        <Post 
          key={index} 
          index={index} 
          post={post} 
          />
      ))}
    </div>
      </LayoutWrapperMain>
      <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
    );
  };
    
  export default Posts;