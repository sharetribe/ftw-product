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

  import { FormattedMessage } from '../../../util/reactIntl';
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

        <div>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>
  
      <div className="title">
        <FormattedMessage id="The Sorority Swap Thoughts" />
      </div>
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
      </div>
    </StaticPage>
    );
  };
    
  export default Posts;