import React from 'react';
// Import shared components
import { FieldSelect } from '../../../components';
// Import modules from this directory
import css from './EditListingWizard.module.css';

import { useFormState } from 'react-final-form';

const CustomFieldEnum = props => {
  const { name, id, options, label, placeholder, validate, schemaType, shouldHideOnMadeToOrder } = props;

  const formState = useFormState();

  function shouldHide() {
    // formState.values["test"] = "test";
    // alert("formState: " + JSON.stringify(formState.values));
    if(shouldHideOnMadeToOrder) {
      if(formState.values['madetoorder'] == 'true') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return options && schemaType === 'enum' && !shouldHide() ? (
    <FieldSelect
      className={css.detailsSelect}
      name={name}
      id={id}
      label={label}
      validate={validate}
    >
      <option disabled value="">
        {placeholder}
      </option>
      {options.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
) : null;
};

export default CustomFieldEnum;
