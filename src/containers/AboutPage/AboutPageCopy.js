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
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Local Artifacts',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>There's art, indeed, for every need.</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream." />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>"We've built Local Artifacts to give you direct access to the artists you love."</p>
            </div>

            <div className={css.contentMain}>
              <h2>
                The world of Artifacts couldn't be more exciting! Whether you are a casual buyer or an experienced collector, you can find the right piece from artists that will be custom built and safely sent to you or will be ready for pickup.
              </h2>

              <p>
                Buying custom art can be stressful: you can find many online websites where to buy direct but most are not curated. With Local Artifacts, we want to make sure you're transaction will go smoothly: from browsing and ordering custom, to making the order and payment, to the review of the sellers.
              </p>

              <h3 className={css.subtitle}>Artists, do you want to be listed on Local ARtifacts?</h3>

              <p>
                Local Artifacts offers you a new channel to share your art with the world! If you're not conent with your online
                distribution, why not try selling them through our platform? Let us be a stockist for you so you don't need to worry about SEOs, Marketing, CRMs, new sales channels. Leave all that to us!
              </p>

              <h3 id="contact" className={css.subtitle}>
                Create your own marketplace like Local Artifacts
              </h3>
              <p>
                Local Artifacts is brought to you by the good folks at{' '}
                <ExternalLink href="https://www.sharetribe.com">Sharetribe</ExternalLink>. Would you like
                to create your own marketplace platform a bit like Local Artifacts? Or perhaps a mobile
                app? With Sharetribe it's really easy. If you have a marketplace idea in mind, do
                get in touch!
              </p>
              <p>
                You can also checkout our{' '}
                <ExternalLink href={siteFacebookPage}>Facebook</ExternalLink> and{' '}
                <ExternalLink href={siteTwitterPage}>Twitter</ExternalLink>.
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
