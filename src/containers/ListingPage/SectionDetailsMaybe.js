import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';
import CustomFieldEnum from '../EditListingPage/EditListingWizard/CustomFieldEnum';
import { Form } from '../../components';

import css from './ListingPage.module.css';

const SectionDetailsMaybe = props => {
  const { publicData, customConfig } = props;
  const { listing, filters } = customConfig || {};

  if (!publicData || !customConfig || !listing?.enumFieldDetails) {
    return null;
  }

  const pickExtendedData = filterConfig => (rows, key) => {
    const publicDataValue = publicData[key];
    if (publicDataValue) {
      const filterIfItExists = filterConfig.find(f => f.id === key);
      const filterOptions = filterIfItExists?.config?.options || [];
      const value = filterOptions.find(o => o.key === publicDataValue)?.label || publicDataValue;
      const label = filterIfItExists?.label || `${key.charAt(0).toUpperCase()}${key.slice(1)}`;

      return rows.concat({ key, value, label });
    }
    return rows;
  };

  const existingExtendedData = listing?.enumFieldDetails.reduce(pickExtendedData(filters), []);

  function isMadeToOrder(extendedData) {
    for(let i = 0; i < extendedData.length; i++) {
      if(extendedData[i].key == "madetoorder") {
        if(extendedData[i].value == "True") {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  const options = ["Hello"];
  return existingExtendedData ? (
    <div className={css.sectionDetails}>
      <h2 className={css.detailsTitle}>
        <FormattedMessage id="ListingPage.detailsTitle" />
      </h2>
      <ul className={css.details}>
        {existingExtendedData.map(detail => (
          <li key={detail.key} className={css.detailsRow} id="detailsRow">
            <span className={css.detailLabel}>{detail.label}</span>
            {isMadeToOrder(existingExtendedData) ? 
              <select className={css.detailsRowSelect}>
                <option disabled selected value> Select an option! </option>
                <option>Hello</option>
              </select> : <span>{detail.value}</span>}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default SectionDetailsMaybe;
