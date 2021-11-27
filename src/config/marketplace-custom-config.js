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
    type: 'SelectSingleFilter',
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
        { key: 'discs', label: 'Discs' },
        { key: 'bags', label: 'Bags' },
        { key: 'carts', label: 'Carts' },
        { key: 'accessories', label: 'Accessories' },
      ],
    },
  },
  {
    id: 'manufacturer',
    label: 'Manufacturer',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_brand'],
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
        { key: '1080_disc_golf', label: '1080 Disc Golf'},
        { key: 'abc_discs', label: 'ABC Discs'},
        { key: 'above_ground_level', label: 'Above Ground Level'},
        { key: 'aerobie', label: 'Aerobie'},
        { key: 'albatross_disc_golf', label: 'Albatross Disc Golf'},
        { key: 'alfa_discs', label: 'Alfa Discs'},
        { key: 'aquaflight_discs', label: 'AquaFlight Discs'},
        { key: 'arsenal_discs', label: 'Arsenal Discs'},
        { key: 'axiom_discs', label: 'Axiom Discs'},
        { key: 'best_disc_golf_discs', label: 'Best Disc Golf Discs'},
        { key: 'black_zombie_disc_golf', label: 'Black Zombie Disc Golf'},
        { key: 'cheengz_hyperflite', label: 'Cheengz/Hyperflite'},
        { key: 'ching_sports', label: 'CHING Sports'},
        { key: 'clash_discs', label: 'Clash Discs'},
        { key: 'crosslap_disc_golf_parks', label: 'Crosslap Disc Golf Parks'},
        { key: 'daredevil_discs', label: 'Daredevil Discs'},
        { key: 'deity_discs', label: 'Deity Discs'},
        { key: 'destiny_dynamic_disc', label: 'Destiny/Dynamic Disc'},
        { key: 'disc_golf_association', label: 'Disc Golf Association'},
        { key: 'disc_golf_uk_ltd.', label: 'Disc Golf UK Ltd.'},
        { key: 'disc_king', label: 'Disc King'},
        { key: 'discmania', label: 'Discmania'},
        { key: 'discraft', label: 'Discraft'},
        { key: 'disctroyer', label: 'Disctroyer OÜ'},
        { key: 'discwing_ltd', label: 'Discwing, Ltd.'},
        { key: 'divergent_discs', label: 'Divergent Discs'},
        { key: 'dkg_disc_sports', label: 'DKG Disc Sports'},
        { key: 'dmi_sports', label: 'DMI Sports'},
        { key: 'dynamic_discs', label: 'Dynamic Discs'},
        { key: 'element_discs', label: 'Element Discs'},
        { key: 'elevation_disc_golf', label: 'Elevation Disc Golf'},
        { key: 'emsco_group', label: 'EMSCO Group'},
        { key: 'essential_discs', label: 'Essential Discs'},
        { key: 'eurodisc', label: 'Eurodisc'},
        { key: 'ev_7', label: 'EV-7'},
        { key: 'ferris_state_university', label: 'Ferris State University'},
        { key: 'fly_high_discs', label: 'Fly High Discs'},
        { key: 'flytec', label: 'FlyTec'},
        { key: 'fourth_circle_discs', label: 'Fourth Circle Discs'},
        { key: 'full_turn_discs', label: 'Full Turn Discs'},
        { key: 'galaxy_disc_golf', label: 'Galaxy Disc Golf'},
        { key: 'gateway_disc_sports', label: 'Gateway Disc Sports'},
        { key: 'guru_disc_golf', label: 'Guru Disc Golf'},
        { key: 'hero_disc', label: 'Hero Disc'},
        { key: 'hero_leports_co_ltd', label: 'Hero Leports Co., Ltd.'},
        { key: 'hobbysport', label: 'Hobbysport'},
        { key: 'hole19_sarl', label: 'Hole19 sarl'},
        { key: 'infinite_discs', label: 'Infinite Discs'},
        { key: 'innova_champion_discs', label: 'Innova Champion Discs'},
        { key: 'kastaplast', label: 'Kastaplast'},
        { key: 'kestrel_outdoors', label: 'Kestrel Outdoors'},
        { key: 'las_aves_disc_golf', label: 'Las Aves Disc Golf'},
        { key: 'latitude_64', label: 'Latitude 64'},
        { key: 'launch_disc_golf', label: 'Launch Disc Golf'},
        { key: 'lb_sport_loisir', label: 'LB Sport Loisir'},
        { key: 'legacy_discs', label: 'Legacy Discs'},
        { key: 'lightning_discs', label: 'Lightning Discs'},
        { key: 'løft_discs', label: 'Løft Discs'},
        { key: 'lone_star_molding', label: 'Lone Star Molding'},
        { key: 'millennium_golf_discs', label: 'Millennium Golf Discs'},
        { key: 'mint_discs', label: 'Mint Discs'},
        { key: 'momentum_disc_golf_ab', label: 'Momentum Disc Golf AB'},
        { key: 'mvp_disc_sports', label: 'MVP Disc Sports'},
        { key: 'newb_simhouse_custom_discs', label: 'Newb SimHouse Custom Discs'},
        { key: 'nordisc', label: 'Nordisc'},
        { key: 'obsidian_discs_oy', label: 'Obsidian Discs Oy'},
        { key: 'ozone_discs', label: 'Ozone Discs'},
        { key: 'pacific_cycle', label: 'Pacific Cycle'},
        { key: 'paradigm_disc_golf', label: 'Paradigm Disc Golf'},
        { key: 'parked_llc', label: 'Parked LLC'},
        { key: 'pie_pan_discs', label: 'Pie Pan Discs'},
        { key: 'plastic_addicts', label: 'Plastic Addicts'},
        { key: 'plastic_paradise', label: 'Plastic Paradise'},
        { key: 'prodigy_disc', label: 'Prodigy Disc'},
        { key: 'prodiscus', label: 'Prodiscus'},
        { key: 'quest_applied_technologies', label: 'Quest Applied Technologies'},
        { key: 'reptilian_disc_golf', label: 'Reptilian Disc Golf'},
        { key: 'rip_disc_golf', label: 'Rip Disc Golf'},
        { key: 'rpm_discs_disc_golf_aotearoa', label: 'RPM Discs/Disc Golf Aotearoa'},
        { key: 'salient_discs', label: 'Salient Discs'},
        { key: 'skyiron', label: 'Skyiron'},
        { key: 'skyquest_discs', label: 'Skyquest Discs'},
        { key: 'snap_discsports', label: 'Snap Discsports'},
        { key: 'sportme', label: 'Sportme'},
        { key: 'storm_disc_golf', label: 'Storm Disc Golf'},
        { key: 'streamline_discs', label: 'Streamline Discs'},
        { key: 'sune_sport', label: 'Sune Sport'},
        { key: 'synergy_discs', label: 'Synergy Discs'},
        { key: 'thought_space_athletics', label: 'Thought Space Athletics'},
        { key: 'tobu_discs', label: 'Tobu Discs'},
        { key: 'tokyo_discs', label: 'Tokyo Discs'},
        { key: 'tornado_throw', label: 'Tornado Throw'},
        { key: 'ub_disc_golf_hand_candy', label: 'UB Disc Golf - Hand Candy'},
        { key: 'vibram_disc_golf', label: 'Vibram Disc Golf'},
        { key: 'viking_discs', label: 'Viking Discs (IP-Agency Finland Oy)'},
        { key: 'westside_golf_discs', label: 'Westside Golf Discs'},
        { key: 'wham-o_inc', label: 'Wham-O, Inc.'},
        { key: 'wild_discs', label: 'Wild Discs'},
        { key: 'xcom_discs', label: 'XCOM Discs'},
        { key: 'yikun_discs', label: 'Yikun Discs'},
      ],
    },
  },
  {
    id: 'disc_type',
    label: 'Disc type',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_type'],
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
        { key: 'distance_driver', label: 'Distance Driver'},
        { key: 'control_driver', label: 'Control/Fairway Driver'},
        { key: 'midrange', label: 'Midrange'},
        { key: 'putter', label: 'putt/approach'},
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
  enumFieldDetails: ['category', 'manufacturer', 'disc_type'],
};
