import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './PrivacyPolicy.module.css';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p>Your privacy is important to us. It is Sorority Swap Inc&#39;s policy to respect your privacy and comply with any applicable law and regulation regarding any personal information we may collect about you, including across our website, <a href="https://www.thesororityswap.com">https://www.thesororityswap.com</a>, and other sites we own and operate. </p>
      <p>Personal information is any information about you which can be used to identify you. This includes information about you as a person (such as name, address, and date of birth), your devices, payment details, and even information about how you use a website or online service. </p>
      <p>In the event our site contains links to third-party sites and services, please be aware that those sites and services have their own privacy policies. After following a link to any third-party content, you should read their posted privacy policy information about how they collect and use personal information. This Privacy Policy does not apply to any of your activities after you leave our site. </p>
      <p>This policy is effective as of 11 August 2022. </p>
      <p>Last updated: 11 August 2022 </p>
      <h3>Information We Collect</h3>
      <p>Information we collect falls into one of two categories: &ldquo;voluntarily provided&rdquo; information and &ldquo;automatically collected&rdquo; information. </p>
      <p>&ldquo;Voluntarily provided&rdquo; information refers to any information you knowingly and actively provide us when using or participating in any of our services and promotions. </p>
      <p>&ldquo;Automatically collected&rdquo; information refers to any information automatically sent by your devices in the course of accessing our products and services. </p>
      <h4>Log Data</h4>
      <p>When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your device’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details about your visit. </p>
      <p>Additionally, if you encounter certain errors while using the site, we may automatically collect data about the error and the circumstances surrounding its occurrence. This data may include technical details about your device, what you were trying to do when the error happened, and other technical information relating to the problem. You may or may not receive notice of such errors, even in the moment they occur, that they have occurred, or what the nature of the error is. </p>
      <p>Please be aware that while this information may not be personally identifying by itself, it may be possible to combine it with other data to personally identify individual persons. </p>
      <h4>Personal Information</h4>
      <p>We may ask for personal information — for example, when you make a purchase or when you contact us — which may include one or more of the following: </p>
      <ul>
        <li>Name</li>
        <li>Email</li>
        <li>Phone/mobile number</li>
        <li>Home/mailing address</li>
      </ul>
      <h4>User-Generated Content</h4>
      <p>We consider &ldquo;user-generated content&rdquo; to be reviews, ratings, image, and/or video materials voluntarily supplied to us by our users for the purpose of publication on our website or re-publishing on our social media channels. All user-generated content is associated with the account or email address used to submit the materials. </p>
      <p>Please be aware that any content you submit for the purpose of publication will be public after posting (and subsequent review or vetting process). Once published, it may be accessible to third parties not covered under this privacy policy. </p>
      <h4>Legitimate Reasons for Processing Your Personal Information</h4>
      <p>We only collect and use your personal information when we have a legitimate reason for doing so. In which instance, we only collect personal information that is reasonably necessary to provide our services to you. </p>
      <h4>Collection and Use of Information</h4>
      <p>We may collect personal information from you when you do any of the following on our website: </p>
      <ul>
        <li>Register for an account</li>
        <li>Purchase any products and/or services</li>
        <li>Purchase a subscription</li>
        <li>Use a mobile device or web browser to access our content</li>
        <li>Contact us via email, social media, or on any similar technologies</li>
        <li>When you mention us on social media</li>
      </ul>
      <p>We may collect, hold, use, and disclose information for the following purposes, and personal information will not be further processed in a manner that is incompatible with these purposes: </p>
      <ul>
        <li>to provide you with our platform's core features and services</li>
        <li>to process any transactional or ongoing payments</li>
        <li>to deliver products and/or services to you</li>
        <li>to contact and communicate with you</li>
        <li>for internal record keeping and administrative purposes</li>
        <li>for security and fraud prevention, and to ensure that our sites and apps are safe, secure, and used in line with our terms of use</li>
      </ul>
      <p>We may combine voluntarily provided and automatically collected personal information with general information or research data we receive from other trusted sources. For example, If you provide us with your location, we may combine this with general information about currency and language to provide you with an enhanced experience of our site and service. </p>
      <h4>Security of Your Personal Information</h4>
      <p>When we collect and process personal information, and while we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification. </p>
      <p>Although we will do our best to protect the personal information you provide to us, we advise that no method of electronic transmission or storage is 100% secure, and no one can guarantee absolute data security. </p>
      <p>You are responsible for selecting any password and its overall security strength, ensuring the security of your own information within the bounds of our services. For example, ensuring any passwords associated with accessing your personal information and accounts are secure and confidential. </p>
      <h4>How Long We Keep Your Personal Information</h4>
      <p>We keep your personal information only for as long as we need to. This time period may depend on what we are using your information for, in accordance with this privacy policy. For example, if you have provided us with personal information as part of creating an account with us, we may retain this information for the duration your account exists on our system. If your personal information is no longer required for this purpose, we will delete it or make it anonymous by removing all details that identify you. </p>
      <p>However, if necessary, we may retain your personal information for our compliance with a legal, accounting, or reporting obligation or for archiving purposes in the public interest, scientific, or historical research purposes or statistical purposes. </p>
      <h3>Children’s Privacy</h3>
      <p>We do not aim any of our products or services directly at children under the age of 13, and we do not knowingly collect personal information about children under 13. </p>
      <h3>Disclosure of Personal Information to Third Parties</h3>
      <p>We may disclose personal information to: </p>
      <ul>
        <li>a parent, subsidiary, or affiliate of our company</li>
        <li>third-party service providers for the purpose of enabling them to provide their services, including (without limitation) IT service providers, data storage, hosting and server providers, error loggers, debt collectors, maintenance or problem-solving providers, professional advisors, and payment systems operators</li>
        <li>our employees, contractors, and/or related entities</li>
        <li>our existing or potential agents or business partners</li>
        <li>credit reporting agencies, courts, tribunals, and regulatory authorities, in the event you fail to pay for goods or services we have provided to you</li>
        <li>courts, tribunals, regulatory authorities, and law enforcement officers, as required by law, in connection with any actual or prospective legal proceedings, or in order to establish, exercise, or defend our legal rights</li>
        <li>third parties, including agents or sub-contractors, who assist us in providing information, products, services, or direct marketing to you</li>
        <li>third parties to collect and process data</li>
        <li>an entity that buys, or to which we transfer all or substantially all of our assets and business</li>
      </ul>
      <p>Third parties we currently use include: </p>
      <ul>
        <li>Stripe</li>
      </ul>
      <h3>Your Rights and Controlling Your Personal Information</h3>
      <p><strong>Your choice:</strong> By providing personal information to us, you understand we will collect, hold, use, and disclose your personal information in accordance with this privacy policy. You do not have to provide personal information to us, however, if you do not, it may affect your use of our website or the products and/or services offered on or through it. </p>
      <p><strong>Information from third parties:</strong> If we receive personal information about you from a third party, we will protect it as set out in this privacy policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person’s consent to provide the personal information to us. </p>
      <p><strong>Marketing permission:</strong> If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by contacting us using the details below. </p>
      <p><strong>Access:</strong> You may request details of the personal information that we hold about you. </p>
      <p><strong>Correction:</strong> If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, please contact us using the details provided in this privacy policy. We will take reasonable steps to correct any information found to be inaccurate, incomplete, misleading, or out of date. </p>
      <p><strong>Non-discrimination:</strong> We will not discriminate against you for exercising any of your rights over your personal information. Unless your personal information is required to provide you with a particular service or offer (for example processing and fulfilling orders), we will not deny you goods or services and/or charge you different prices or rates for goods or services, including through granting discounts or other benefits, or imposing penalties, or provide you with a different level or quality of goods or services. </p>
      <p><strong>Notification of data breaches:</strong> We will comply with laws applicable to us in respect of any data breach. </p>
      <p><strong>Complaints:</strong> If you believe that we have breached a relevant data protection law and wish to make a complaint, please contact us using the details below and provide us with full details of the alleged breach. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take to deal with your complaint. You also have the right to contact a regulatory body or data protection authority in relation to your complaint. </p>
      <p><strong>Unsubscribe:</strong> To unsubscribe from our email database or opt-out of communications (including marketing communications), please contact us using the details provided in this privacy policy, or opt-out using the opt-out facilities provided in the communication. We may need to request specific information from you to help us confirm your identity. </p>
      <h3>Use of Cookies</h3>
      <p>We use &ldquo;cookies&rdquo; to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site. This helps us serve you content based on preferences you have specified. </p>
      <p>Please refer to our Cookie Policy for more information. </p>
      <h3>Business Transfers</h3>
      <p>If we or our assets are acquired, or in the unlikely event that we go out of business or enter bankruptcy, we would include data, including your personal information, among the assets transferred to any parties who acquire us. You acknowledge that such transfers may occur, and that any parties who acquire us may, to the extent permitted by applicable law, continue to use your personal information according to this policy, which they will be required to assume as it is the basis for any ownership or use rights we have over such information. </p>
      <h3>Limits of Our Policy</h3>
      <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites, and cannot accept responsibility or liability for their respective privacy practices. </p>
      <h3>Changes to This Policy</h3>
      <p>At our discretion, we may change our privacy policy to reflect updates to our business processes, current acceptable practices, or legislative or regulatory changes. If we decide to change this privacy policy, we will post the changes here at the same link by which you are accessing this privacy policy. </p>
      <p>If the changes are significant, or if required by applicable law, we will contact you (based on your selected preferences for communications from us) and all our registered users with the new details and links to the updated or changed policy. </p>
      <p>If required by law, we will get your permission or give you the opportunity to opt in to or opt out of, as applicable, any new uses of your personal information. </p>
      <h3>Additional Disclosures for California Compliance (US)</h3>
      <p>Under California Civil Code Section 1798.83, if you live in California and your business relationship with us is mainly for personal, family, or household purposes, you may ask us about the information we release to other organizations for their marketing purposes. </p>
      <p>To make such a request, please contact us using the details provided in this privacy policy with &ldquo;Request for California privacy information&rdquo; in the subject line. You may make this type of request once every calendar year. We will email you a list of categories of personal information we revealed to other organisations for their marketing purposes in the last calendar year, along with their names and addresses. Not all personal information shared in this way is covered by Section 1798.83 of the California Civil Code. </p>
      <h4>Do Not Track</h4>
      <p>Some browsers have a &ldquo;Do Not Track&rdquo; feature that lets you tell websites that you do not want to have your online activities tracked. At this time, we do not respond to browser &ldquo;Do Not Track&rdquo; signals. </p>
      <p>We adhere to the standards outlined in this privacy policy, ensuring we collect and process personal information lawfully, fairly, transparently, and with legitimate, legal reasons for doing so. </p>
      <h4>Cookies and Pixels</h4>
      <p>At all times, you may decline cookies from our site if your browser permits. Most browsers allow you to activate settings on your browser to refuse the setting of all or some cookies. Accordingly, your ability to limit cookies is based only on your browser’s capabilities. Please refer to the Cookies section of this privacy policy for more information. </p>
      <h4>CCPA-permitted financial incentives</h4>
      <p>In accordance with your right to non-discrimination, we may offer you certain financial incentives permitted by the CCPA that can result in different prices, rates, or quality levels for the goods or services we provide. </p>
      <p>Any CCPA-permitted financial incentive we offer will reasonably relate to the value of your personal information, and we will provide written terms that describe clearly the nature of such an offer. Participation in a financial incentive program requires your prior opt-in consent, which you may revoke at any time. </p>
      <h4>California Notice of Collection</h4>
      <p>In the past 12 months, we have collected the following categories of personal information enumerated in the California Consumer Privacy Act: </p>
      <ul>
        <li>Identifiers, such as name, email address, phone number account name, IP address, and an ID or number assigned to your account.</li>
        <li>Customer records, such as billing and shipping address, and credit or debit card data.</li>
        <li>Commercial information, such as products or services history and purchases.</li>
        <li>Audio or visual data, such as photos or videos you share with us or post on the service.</li>
      </ul>
      <p>For more information on information we collect, including the sources we receive information from, review the &ldquo;Information We Collect&rdquo; section. We collect and use these categories of personal information for the business purposes described in the &ldquo;Collection and Use of Information&rdquo; section, including to provide and manage our Service. </p>
      <h4>Right to Know and Delete</h4>
      <p>If you are a California resident, you have rights to delete your personal information we collected and know certain information about our data practices in the preceding 12 months. In particular, you have the right to request the following from us: </p>
      <ul>
        <li>The categories of personal information we have collected about you;</li>
        <li>The categories of sources from which the personal information was collected;</li>
        <li>The categories of personal information about you we disclosed for a business purpose or sold;</li>
        <li>The categories of third parties to whom the personal information was disclosed for a business purpose or sold;</li>
        <li>The business or commercial purpose for collecting or selling the personal information; and</li>
        <li>The specific pieces of personal information we have collected about you.</li>
      </ul>
      <p>To exercise any of these rights, please contact us using the details provided in this privacy policy. </p>
      <h4>Shine the Light</h4>
      <p>If you are a California resident, in addition to the rights discussed above, you have the right to request information from us regarding the manner in which we share certain personal information as defined by California’s &ldquo;Shine the Light&rdquo; with third parties and affiliates for their own direct marketing purposes. </p>
      <p>To receive this information, send us a request using the contact details provided in this privacy policy. Requests must include &ldquo;California Privacy Rights Request&rdquo; in the first line of the description and include your name, street address, city, state, and ZIP code. </p>
      <h3>Contact Us</h3>
      <p>For any questions or concerns regarding your privacy, you may contact us using the following details: </p>
      <p>The Sorority Swap Support<br />
      support@greekswaps.com </p>
    </div>
  );
};

PrivacyPolicy.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

PrivacyPolicy.propTypes = {
  rootClassName: string,
  className: string,
};

export default PrivacyPolicy;
