import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';

// Import configs and util modules
import config from '../../../../config';
import { intlShape, injectIntl, FormattedMessage } from '../../../../util/reactIntl';
import { propTypes } from '../../../../util/types';
import { maxLength, required, composeValidators } from '../../../../util/validators';
import { findConfigForSelectFilter, findOptionsForSelectFilter } from '../../../../util/search';

// Import shared components
import { Form, Button, FieldTextInput, FieldCheckboxGroup } from '../../../../components';
// Import modules from this directory
import CustomFieldEnum from '../CustomFieldEnum';
import css from './EditListingDetailsForm.module.css';

import arrayMutators from 'final-form-arrays';

const TITLE_MAX_LENGTH = 60;

const EditListingDetailsFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={formRenderProps => {
      const {
        autoFocus,
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        filterConfig,
      } = formRenderProps;

      const titleMessage = intl.formatMessage({ id: 'EditListingDetailsForm.title' });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.titlePlaceholder',
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDetailsForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const descriptionMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.description',
      });
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.descriptionPlaceholder',
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const descriptionRequiredMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.descriptionRequired',
      });

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDetailsForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDetailsForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDetailsForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      const categoryConfig = findConfigForSelectFilter('category', filterConfig);
      const categorySchemaType = categoryConfig.schemaType;
      const categories = categoryConfig.options ? categoryConfig.options : [];
      const categoryLabel = intl.formatMessage({
        id: 'EditListingDetailsForm.categoryLabel',
      });
      const categoryPlaceholder = intl.formatMessage({
        id: 'EditListingDetailsForm.categoryPlaceholder',
      });

      const categoryRequired = required(
        intl.formatMessage({
          id: 'EditListingDetailsForm.categoryRequired',
        })
      );

      const madetoorderConfig = findConfigForSelectFilter('madetoorder', filterConfig);
      const madetoorderSchemaType = madetoorderConfig ? madetoorderConfig.schemaType : null;
      const madetoorderOptions = madetoorderConfig && madetoorderConfig.options ? madetoorderConfig.options : [];
      const madetoorderLabel = intl.formatMessage({
        id: 'EditListingDetailsForm.madetoorderLabel',
      });
      const madetoorderPlaceholder = intl.formatMessage({
        id: 'EditListingDetailsForm.madetoorderPlaceholder',
      });

      const madetoorderRequired = required(
        intl.formatMessage({
          id: 'EditListingDetailsForm.madetoorderRequired',
        })
      );

      const sizeConfig = findConfigForSelectFilter('size', filterConfig);
      const sizeSchemaType = sizeConfig ? sizeConfig.schemaType : null;
      const sizes = sizeConfig && sizeConfig.options ? sizeConfig.options : [];
      const sizeLabel = intl.formatMessage({
        id: 'EditListingDetailsForm.sizeLabel',
      });
      const sizePlaceholder = intl.formatMessage({
        id: 'EditListingDetailsForm.sizePlaceholder',
      });

      const sizeRequired = required(
        intl.formatMessage({
          id: 'EditListingDetailsForm.sizeRequired',
        })
      );

      const colorConfig = findConfigForSelectFilter('color', filterConfig);
      const colorSchemaType = colorConfig ? colorConfig.schemaType : null;
      const colors = colorConfig && colorConfig.options ? colorConfig.options : [];
      const colorLabel = intl.formatMessage({
        id: 'EditListingDetailsForm.colorLabel',
      });
      const colorPlaceholder = intl.formatMessage({
        id: 'EditListingDetailsForm.colorPlaceholder',
      });

      const colorRequired = required(
        intl.formatMessage({
          id: 'EditListingDetailsForm.colorRequired',
        })
      );

      const conditionConfig = findConfigForSelectFilter('condition', filterConfig);
      const conditionSchemaType = conditionConfig ? conditionConfig.schemaType : null;
      const conditions = conditionConfig && conditionConfig.options ? conditionConfig.options : [];
      const conditionLabel = intl.formatMessage({
        id: 'EditListingDetailsForm.conditionLabel',
      });
      const conditionPlaceholder = intl.formatMessage({
        id: 'EditListingDetailsForm.conditionPlaceholder',
      });

      const conditionRequired = required(
        intl.formatMessage({
          id: 'EditListingDetailsForm.conditionRequired',
        })
      );

      const sororityConfig = findConfigForSelectFilter('sorority', filterConfig);
      const sororitySchemaType = sororityConfig ? sororityConfig.schemaType : null;
      const sororities = sororityConfig && sororityConfig.options ? sororityConfig.options : [];
      const sororityLabel = intl.formatMessage({
        id: 'EditListingDetailsForm.sororityLabel',
      });
      const sororityPlaceholder = intl.formatMessage({
        id: 'EditListingDetailsForm.sororityPlaceholder',
      });

      const sororityRequired = required(
        intl.formatMessage({
          id: 'EditListingDetailsForm.sororityRequired',
        })
      );

      const multisizes = findOptionsForSelectFilter('multisize', filterConfig);
      const multicolors = findOptionsForSelectFilter('multicolor', filterConfig);
      const multisororities = findOptionsForSelectFilter('multisorority', filterConfig)

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}

          <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus={autoFocus}
          /> 

          <FieldTextInput
            id="description"
            name="description"
            className={css.description}
            type="textarea"
            label={descriptionMessage}
            placeholder={descriptionPlaceholderMessage}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />

          <CustomFieldEnum
            id="category"
            name="category"
            options={categories}
            label={categoryLabel}
            placeholder={categoryPlaceholder}
            validate={categoryRequired}
            schemaType={categorySchemaType}
            shouldHideOnMadeToOrder={false}
          />

          <CustomFieldEnum
            id="madetoorder"
            name="madetoorder"
            options={madetoorderOptions}
            label={madetoorderLabel}
            placeholder={madetoorderPlaceholder}
            validate={madetoorderRequired}
            schemaType={madetoorderSchemaType}
            shouldHideOnMadeToOrder={false}
          />

          <CustomFieldEnum
            id="size"
            name="size"
            options={sizes}
            label={sizeLabel}
            placeholder={sizePlaceholder}
            validate={sizeRequired}
            schemaType={sizeSchemaType}
            shouldHideOnMadeToOrder={true}
          />

          <CustomFieldEnum
            id="color"
            name="color"
            options={colors}
            label={colorLabel}
            placeholder={colorPlaceholder}
            validate={colorRequired}
            schemaType={colorSchemaType}
            shouldHideOnMadeToOrder={true}
          />

          <CustomFieldEnum
            id="condition"
            name="condition"
            options={conditions}
            label={conditionLabel}
            placeholder={conditionPlaceholder}
            validate={conditionRequired}
            schemaType={conditionSchemaType}
            shouldHideOnMadeToOrder={true}
          />

          <CustomFieldEnum
            id="sorority"
            name="sorority"
            options={sororities}
            label={sororityLabel}
            placeholder={sororityPlaceholder}
            validate={sororityRequired}
            schemaType={sororitySchemaType}
            shouldHideOnMadeToOrder={true}
          />
          
          <FieldCheckboxGroup 
            className={css.features}
            id="multisize" 
            name="multisize" 
            options={multisizes}
            label="Size options"
            />

          <FieldCheckboxGroup 
            className={css.features}
            id="multicolor" 
            name="multicolor" 
            options={multicolors}
            label="Color options"
            />

          <FieldCheckboxGroup 
            className={css.features}
            id="multisorority" 
            name="multisorority" 
            options={multisororities}
            label="Sorority options"
            />



          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingDetailsFormComponent.defaultProps = {
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingDetailsFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  filterConfig: propTypes.filterConfig,
};

export default compose(injectIntl)(EditListingDetailsFormComponent);
