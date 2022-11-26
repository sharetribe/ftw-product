import React from 'react';

import {useParams} from "react-router-dom";

import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';
import StaticPage from '../StaticPage/StaticPage';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import {blogPosts} from './Posts/BlogPosts';

import css from './BlogPage.module.css';
import image from './blog-1056.jpg';

const BlogPage = () => {
  const { siteInstagramPage, siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);
  const {id} = useParams();
  const index = parseInt(id);
  const body = blogPosts[index]["body"]
  // prettier-ignore
  return (
    <StaticPage
      title="The Sorority Swap: let's chat!"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'BlogPage',
        description: 'The Sorority Swap Blog',
        name: 'Blog page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>{blogPosts[index]["title"]}</h1>
          {/* <img className={css.coverImage} src={image} alt="My first ice cream." /> */}

          <div className={css.contentWrapper}>
            <div className={css.contentMain}>
              {body.map((paragraph, index) => (
                <p>{paragraph}</p>
                ))}
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default BlogPage;
