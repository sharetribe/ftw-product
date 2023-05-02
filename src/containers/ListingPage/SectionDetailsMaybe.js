import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';
import CustomFieldEnum from '../EditListingPage/EditListingWizard/CustomFieldEnum';
import { Form, FieldSelect } from '../../components';

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

  function camelToLabel(value) {
    if(value.length !== 0 && value.length > 0) {
      var str = '';
      str += value.charAt(0).toUpperCase();
      var i = 1;
      while(i < value.length) {
        if(value.charAt(i) == value.charAt(i).toUpperCase()) {
          str += ' ';
        }
        str += value.charAt(i);
        i++;
      }
    }
    return str;
  }

  function arrayToCamelCase(value) {
    var arr = [];
    value.map(option => {
      arr.push(camelToLabel(option));
    })
    return arr;
  }

  function isMadeToOrder(extendedData) {
    for(let i = 0; i < extendedData.length; i++) {
      if(extendedData[i].key == "madetoorder") {
        if(extendedData[i].value == "Yes") {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  const madeToOrderFields = ['madetoorder','category','multisize','multicolor','multisorority'];
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
        {isMadeToOrder(existingExtendedData) ? 
          <li key="conditionRow" className={css.detailsRow} id="detailsRow">
            <span className={css.detailLabel}>Condition</span>
            <span>New</span>
          </li> : null}
        {existingExtendedData.map(detail => (isMadeToOrder(existingExtendedData) && madeToOrderFields.includes(detail.key) ?
          <li key={detail.key} className={css.detailsRow} id="detailsRow">
            <span className={css.detailLabel}>{detail.label}</span>
            {Array.isArray(detail.value) ?
              <span>{arrayToCamelCase(detail.value).join(", ")}</span>
              : <span>{detail.value}</span>
            }
          </li> : null
        ))}
      </ul>
    </div>
  ) : null;
};

// For displaying in vertical list
{/* <ul>
{detail.value.map(option => (
  <li className="detailValue">{option}</li>
))}
</ul> */}

                {/* <select className={css.detailsRowSelect}>
                  <option disabled selected value> Select an option! </option>
                  {detail.value.map(option => (
                    <option>{camelToLabel(option)}</option>
                  ))}
                </select> */}

{/* <FieldSelect
id={detail.label}
className={css.multiField}
name={detail.label}
label="TEST"
>
</FieldSelect>  */}

{/* <FieldSelect
id={`${formId}.quantity`}
className={css.quantityField}
name="quantity"
disabled={!hasStock}
label={intl.formatMessage({ id: 'ProductOrderForm.quantityLabel' })}
validate={numberAtLeast(quantityRequiredMsg, 1)}
>
<option disabled value="">
  {intl.formatMessage({ id: 'ProductOrderForm.selectQuantityOption' })}
</option>
{quantities.map(quantity => (
  <option key={quantity} value={quantity}>
    {intl.formatMessage({ id: 'ProductOrderForm.quantityOption' }, { quantity })}
  </option>
))}
</FieldSelect> */}

export default SectionDetailsMaybe;