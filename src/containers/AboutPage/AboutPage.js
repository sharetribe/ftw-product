import React from 'react';

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
import StaticPage from '../../containers/StaticPage/StaticPage';
import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';

import css from './AboutPage.module.css';
import image from './about-us-1056.jpg';

const AboutPage = () => {
  const { siteInstagramPage, siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About The Sorority Swap',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>The Sorority Swap is here for you.</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream." />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Strengthen sisterhood. Make new connections. Find your unique style.</p>
            </div>

            <div className={css.contentMain}>
              <h2>
              The Sorority Swap is a clothing swap for sororities, hosted across the country to strengthen sisterhood, make new connections and help each other find their unique style. A sorority is more than a group of college girls; it’s a family of women who have your back and are there to support you through anything. Get a one-of-a-kind outfit for your next event with The Sorority Swap!
              </h2>

              <p>
              We donate a percentage of revenue to all Panhellenic organizations. The Sorority Swap was born out of our own experiences as Greek, and knowing how hard it can be to find the perfect memento to commemorate such an important milestone. We believe all women deserve the chance to celebrate their accomplishments.
              </p>

              <h3 className={css.subtitle}>Do you have clothing to sell?</h3>

              <p>
                Create a listing and let us do the work!
              </p>

              <p>
                You can also check out our{' '}
                <ExternalLink href={siteFacebookPage}>Facebook</ExternalLink> and{' '}
                <ExternalLink href={siteInstagramPage}>Instagram</ExternalLink>.
              </p>
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

export default AboutPage;
