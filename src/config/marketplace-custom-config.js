/*
 * Marketplace specific configuration.
 *
 * Every filter needs to have following keys:
 * - id:     Unique id of the filter.
 * - label:  The default label of the filter.
 * - type:   String that represents one of the existing filter components:
 *           BookingDateRangeFilter, KeywordFilter, PriceFilter,
 *           SelectSingleFilter, SelectMultipleFilter.
 * - group:  Is this 'primary' or 'secondary' filter?
 *           Primary filters are visible on desktop layout by default.
 *           Secondary filters are behind "More filters" button.
 *           Read more from src/containers/SearchPage/README.md
 * - queryParamNames: Describes parameters to be used with queries
 *                    (e.g. 'price' or 'pub_amenities'). Most of these are
 *                    the same between webapp URLs and API query params.
 *                    You can't change 'dates', 'price', or 'keywords'
 *                    since those filters are fixed to a specific attribute.
 * - config: Extra configuration that the filter component needs.
 *
 * Note 1: Labels could be tied to translation file
 *         by importing FormattedMessage:
 *         <FormattedMessage id="some.translation.key.here" />
 *
 * Note 2: If you need to add new custom filter components,
 *         you need to take those into use in:
 *         src/containers/SearchPage/FilterComponent.js
 *
 * Note 3: If you just want to create more enum filters
 *         (i.e. SelectSingleFilter, SelectMultipleFilter),
 *         you can just add more configurations with those filter types
 *         and tie them with correct extended data key
 *         (i.e. pub_<key> or meta_<key>).
 */

export const filters = [
  {
    id: 'category',
    label: 'Category',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      // Schema type is enum for SelectSingleFilter
      schemaType: 'enum',

      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'hatsAndHeadwear', label: 'Hats & Headwear' },
        { key: 'jacketsAndSportswear', label: 'Jackets & Sportswear' },
        { key: 'shirts', label: 'Shirts' },
        { key: 'sweatsAndCasual', label: 'Sweats & Casual' },
        { key: 'sweatshirts', label: 'Sweatshirts' },
        { key: 'accessories', label: 'Accessories' },
      ],
    },
  },
  {
    id: 'madeToOrder',
    label: 'Made to Order',
    type: 'SelectSingleFilter',
    group: 'primary',
    queryParamNames: ['pub_madetoorder'],
    config: {
      // Schema type options: 'enum', 'multi-enum'
      // Both types can work so that user selects multiple values when filtering search results.
      // With "enum" the functionality will be OR-semantics (Nike OR Adidas OR Salomon)
      // With "multi-enum" it's possible to use both AND and OR semantics with searchMode config.
      schemaType: 'enum',

      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'true', label: 'True' },
        { key: 'false', label: 'False' },
      ],
    },
  },
  {
    id: 'size',
    label: 'Size',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_size'],
    config: {
      // Schema type options: 'enum', 'multi-enum'
      // Both types can work so that user selects multiple values when filtering search results.
      // With "enum" the functionality will be OR-semantics (Nike OR Adidas OR Salomon)
      // With "multi-enum" it's possible to use both AND and OR semantics with searchMode config.
      schemaType: 'enum',

      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'extraSmall', label: 'XS' },
        { key: 'small', label: 'S' },
        { key: 'medium', label: 'M' },
        { key: 'large', label: 'L' },
        { key: 'extraLarge', label: 'XL' },
        { key: 'doubleExtraLarge', label: 'XXL' },
        { key: 'oneSize', label: 'One size' },
      ],
    },
  },
  {
    id: 'color',
    label: 'Color',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_color'],
    config: {
      // Schema type options: 'enum', 'multi-enum'
      // Both types can work so that user selects multiple values when filtering search results.
      // With "enum" the functionality will be OR-semantics (Nike OR Adidas OR Salomon)
      // With "multi-enum" it's possible to use both AND and OR semantics with searchMode config.
      schemaType: 'enum',

      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'black', label: 'Black' },
        { key: 'blue', label: 'Blue' },
        { key: 'brown', label: 'Brown' },
        { key: 'clear', label: 'Clear' },
        { key: 'gold', label: 'Gold' },
        { key: 'gray', label: 'Gray' },
        { key: 'green', label: 'Green' },
        { key: 'orange', label: 'Orange' },
        { key: 'pink', label: 'Pink' },
        { key: 'purple', label: 'Purple' },
        { key: 'rainbow', label: 'Rainbow' },
        { key: 'red', label: 'Red' },
        { key: 'silver', label: 'Silver' },
        { key: 'tan', label: 'Tan' },
        { key: 'white', label: 'White' },
        { key: 'yellow', label: 'Yellow' },
      ],
    },
  },

  {
    id: 'condition',
    label: 'Condition',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_condition'],
    config: {
      // Schema type options: 'enum', 'multi-enum'
      // Both types can work so that user selects multiple values when filtering search results.
      // With "enum" the functionality will be OR-semantics (Nike OR Adidas OR Salomon)
      // With "multi-enum" it's possible to use both AND and OR semantics with searchMode config.
      schemaType: 'enum',

      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'new', label: 'New' },
        { key: 'good', label: 'Good' },
        { key: 'fair', label: 'Fair' },
      ],
    },
  },

  {
    id: 'sorority',
    label: 'Sorority',
    type: 'SelectSingleFilter',
    group: 'primary',
    queryParamNames: ['pub_sorority'],
    config: {
      // Schema type options: 'enum', 'multi-enum'
      // Both types can work so that user selects multiple values when filtering search results.
      // With "enum" the functionality will be OR-semantics (Nike OR Adidas OR Salomon)
      // With "multi-enum" it's possible to use both AND and OR semantics with searchMode config.
      schemaType: 'enum',

      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'alphaChiOmega', label: 'Alpha Chi Omega' },
        { key: 'alphaDeltaPi', label: 'Alpha Delta Pi' },
        { key: 'alphaEpsilonPhi', label: 'Alpha Epsilon Phi' },
        { key: 'alphaGammaDelta', label: 'Alpha Gamma Delta' },
        { key: 'alphaOmicronPi', label: 'Alpha Omicron Pi' },
        { key: 'alphaPhi', label: 'Alpha Phi' },
        { key: 'alphaSigmaAlpha', label: 'Alpha Sigma Alpha' },
        { key: 'alphaSigmaTau', label: 'Alpha Sigma Tau' },
        { key: 'alphaXiDelta', label: 'Alpha Xi Delta' },
        { key: 'chiOmega', label: 'Chi Omega' },
        { key: 'deltaDeltaDelta', label: 'Delta Delta Delta' },
        { key: 'deltaGamma', label: 'Delta Gamma' },
        { key: 'deltaPhiEpsilon', label: 'Delta Phi Epsilon' },
        { key: 'deltaZeta', label: 'Delta Zeta' },
        { key: 'gammaPhiBeta', label: 'Gamma Phi Beta' },
        { key: 'kappaAlphaTheta', label: 'Kappa Alpha Theta' },
        { key: 'kappaDelta', label: 'Kappa Delta' },
        { key: 'kappaKappaGamma', label: 'Kappa Kappa Gamma' },
        { key: 'phiMu', label: 'Phi Mu' },
        { key: 'phiSigmaSigma', label: 'Phi Sigma Sigma' },
        { key: 'piBetaPhi', label: 'Pi Beta Phi' },
        { key: 'rhoGamma', label: 'Rho Gamma' },
        { key: 'sigmaDeltaTau', label: 'Sigma Delta Tau' },
        { key: 'sigmaKappa', label: 'Sigma Kappa' },
        { key: 'sigmaSigmaSigma', label: 'Sigma Sigma Sigma' },
        { key: 'thetaPhiAlpha', label: 'Theta Phi Alpha' },
        { key: 'zetaTauAlpha', label: 'Zeta Tau Alpha' },
        { key: 'notAssociated', label: 'Not Associated' },
      ],
    },
  },
  {
    id: 'price',
    label: 'Price',
    type: 'PriceFilter',
    group: 'primary',
    // Note: PriceFilter is fixed filter,
    // you can't change "queryParamNames: ['price'],"
    queryParamNames: ['price'],
    // Price filter configuration
    // Note: unlike most prices this is not handled in subunits
    config: {
      min: 0,
      max: 1000,
      step: 5,
    },
  },
  {
    id: 'keyword',
    label: 'Keyword',
    type: 'KeywordFilter',
    group: 'primary',
    // Note: KeywordFilter is fixed filter,
    // you can't change "queryParamNames: ['keywords'],"
    queryParamNames: ['keywords'],
    // NOTE: If you are ordering search results by distance
    // the keyword search can't be used at the same time.
    // You can turn on/off ordering by distance from config.js file.
    config: {},
  },

  // Here is an example of multi-enum search filter.
  //
  // {
  //   id: 'amenities',
  //   label: 'Amenities',
  //   type: 'SelectMultipleFilter',
  //   group: 'secondary',
  //   queryParamNames: ['pub_amenities'],
  //   config: {
  //     // Schema type options: 'enum', 'multi-enum'
  //     // Both types can work so that user selects multiple values when filtering search results.
  //     // With "enum" the functionality will be OR-semantics (Nike OR Adidas OR Salomon)
  //     // With "multi-enum" it's possible to use both AND and OR semantics with searchMode config.
  //     schemaType: 'multi-enum',

  //     // Optional modes: 'has_all', 'has_any'
  //     // Note: this is relevant only for schema type 'multi-enum'
  //     // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
  //     searchMode: 'has_all',

  //     // "key" is the option you see in Flex Console.
  //     // "label" is set here for this web app's UI only.
  //     // Note: label is not added through the translation files
  //     // to make filter customizations a bit easier.
  //     options: [
  //       { key: 'towels', label: 'Towels' },
  //       { key: 'bathroom', label: 'Bathroom' },
  //       { key: 'swimming_pool', label: 'Swimming pool' },
  //       { key: 'barbeque', label: 'Barbeque' },
  //     ],
  //   },
  // },
];

export const sortConfig = {
  // Enable/disable the sorting control in the SearchPage
  active: true,

  // Note: queryParamName 'sort' is fixed,
  // you can't change it since Flex API expects it to be named as 'sort'
  queryParamName: 'sort',

  // Internal key for the relevance option, see notes below.
  relevanceKey: 'relevance',

  // Relevance key is used with keywords filter.
  // Keywords filter also sorts results according to relevance.
  relevanceFilter: 'keywords',

  // Keyword filter is sorting the results by relevance.
  // If keyword filter is active, one might want to disable other sorting options
  // by adding 'keyword' to this list.
  conflictingFilters: [],

  options: [
    { key: 'createdAt', label: 'Newest' },
    { key: '-createdAt', label: 'Oldest' },
    { key: '-price', label: 'Lowest price' },
    { key: 'price', label: 'Highest price' },

    // The relevance is only used for keyword search, but the
    // parameter isn't sent to the Marketplace API. The key is purely
    // for handling the internal state of the sorting dropdown.
    { key: 'relevance', label: 'Relevance', longLabel: 'Relevance (Keyword search)' },
  ],
};

export const listing = {
  // These should be listing details from public data with schema type: enum
  // SectionDetailsMaybe component shows these on listing page.
  enumFieldDetails: ['size', 'sorority', 'madeToOrder', 'category', 'color', 'condition'],
};
