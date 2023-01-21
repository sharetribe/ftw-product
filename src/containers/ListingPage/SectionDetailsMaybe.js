import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';
import CustomFieldEnum from '../EditListingPage/EditListingWizard/CustomFieldEnum';
import { Form } from '../../components';

import css from './ListingPage.module.css';
import { YesNo } from '../../components/FieldBoolean/FieldBoolean.example';

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

  const madeToOrderFields = ['category','blah'];
  const notMadeToOrderFields = ['category','size','sorority','color','condition'];

  return existingExtendedData ? (
    <div className={css.sectionDetails}>
      <h2 className={css.detailsTitle}>
        <FormattedMessage id="ListingPage.detailsTitle" />
      </h2>
      <ul className={css.details}>
        {existingExtendedData.map(detail => (!isMadeToOrder(existingExtendedData) && notMadeToOrderFields.includes(detail.key) ?
          <li key={detail.key} className={css.detailsRow} id="detailsRow">
            <span className={css.detailLabel}>{detail.label}</span>
            <span>{detail.value}</span>
          </li> : null
        ))}
        {existingExtendedData.map(detail => (isMadeToOrder(existingExtendedData) && madeToOrderFields.includes(detail.key) ?
          <li key={detail.key} className={css.detailsRow} id="detailsRow">
            <span className={css.detailLabel}>{detail.label}</span>
            {Array.isArray(detail.value) ? 
              <select className={css.detailsRowSelect}>
                <option disabled selected value> Select an option! </option>
                {detail.value.map(option => (
                  <option>{option}</option>
                ))}
              </select> : <span>{detail.value}</span>
            }
          </li> : null
        ))}
      </ul>
    </div>
  ) : null;
};

export default SectionDetailsMaybe;