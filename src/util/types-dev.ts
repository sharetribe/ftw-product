/**
 * This module defines custom PropTypes shared within the application.
 *
 * To learn about validating React component props with PropTypes, see:
 *
 *     https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 *
 * For component specific PropTypes, it's perfectly ok to inline them
 * to the component itself. If the type is shared or external (SDK or
 * API), however, it should be in this file for sharing with other
 * components.
 *
 * PropTypes should usually be validated only at the lowest level
 * where the props are used, not along the way in parents that pass
 * along the props to their children. Those parents should usually
 * just validate the presense of the prop key and that the value is
 * defined. This way we get the validation errors only in the most
 * specific place and avoid duplicate errros.
 */
import Decimal from 'decimal.js';
import { ReactNode } from 'react';
import { types as sdkTypes } from './sdkLoader-dev';
import { Transitions, TxTransitionActors } from './transaction-dev';

// SDK type instances
export type UUID = typeof sdkTypes.UUID;
export type LatLng = typeof sdkTypes.LatLng;
export type LatlngBounds = typeof sdkTypes.LatLngBounds;
export type Money = typeof sdkTypes.Money;

// Configuration for currency formatting
export interface ICurrencyConfig {
  style: string;
  currency: string;
  currencyDisplay?: string;
  useGrouping?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

// Configuration for a single route
export interface IRoute {
  name: string;
  path: string;
  exact?: boolean;
  stringt?: boolean;
  component: ReactNode;
  loadData?: (...args: any) => void;
}

// Place object from LocationAutocompleteInput
export interface IPlace {
  address: string;
  origin?: LatLng;
  bounds?: LatlngBounds;
}

// Denormalised image object
export interface IImage {
  id: UUID;
  type: 'image';
  attributes: {
    variants?: {
      [variantName: string]: {
        width: number;
        height: number;
        url: string;
      };
    };
  };
}

// Denormalised user object
export interface ICurrentUser {
  id: UUID;
  type: 'currentUser';
  attributes: {
    banned: boolean;
    email: string;
    emailVerified: boolean;
    profile: {
      firstName: string;
      lastName: string;
      displayName: string;
      abbreviatedName: string;
      bio?: string;
    };
    stripeConnected?: boolean;
  };
  profileImage?: IImage;
}

export interface IUserAttributes {
  banned: false;
  deleted: false;
  profile: {
    displayName: string;
    abbreviatedName: string;
    bio?: string;
  };
}

// Listing queries can include author.
// Banned and deleted are not relevant then
// since banned and deleted users can't have listings.
export interface IAuthorAttributes {
  profile?: {
    displayName: string;
    abbreviatedName: string;
    bio?: string;
  };
}

export interface IDeletedUserAttributes {
  deleted: 'true';
}

export interface IBannedUserAttributes {
  banned: 'true';
}

// Denormalised user object
export interface IUser {
  id: UUID;
  type: 'user';
  attributes: IUserAttributes | IAuthorAttributes | IDeletedUserAttributes | IBannedUserAttributes;
  profileImage?: IImage;
}

export const LISTING_STATE_DRAFT = 'draft';
export const LISTING_STATE_PENDING_APPROVAL = 'pendingApproval';
export const LISTING_STATE_PUBLISHED = 'published';
export const LISTING_STATE_CLOSED = 'closed';

type ListingStates =
  | typeof LISTING_STATE_DRAFT
  | typeof LISTING_STATE_PENDING_APPROVAL
  | typeof LISTING_STATE_PUBLISHED
  | typeof LISTING_STATE_CLOSED;

export interface IListingAttributes {
  title: string;
  description?: string;
  geolocation?: LatLng;
  deleted: false;
  state?: ListingStates;
  price?: Money;
  publicData?: object;
}

const AVAILABILITY_PLAN_DAY = 'availability-plan/day';
const AVAILABILITY_PLAN_TIME = 'availability-plan/time';

type AvailabilityPlans = typeof AVAILABILITY_PLAN_DAY | typeof AVAILABILITY_PLAN_TIME;

export type DaysOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface IAvailabilityPlan {
  type: AvailabilityPlans;
  timezone?: string;
  entries?: Array<{
    dayOfWeek: DaysOfWeek;
    seats: number;
    start?: string;
    end?: string;
  }>;
}

export interface IOwnListingAttributes {
  title: string;
  description?: string;
  geolocation?: LatLng;
  deleted: false;
  state: ListingStates;
  price?: Money;
  availabilityPlan?: IAvailabilityPlan;
  publicData: object;
}

export interface IDeletedListingAttributes {
  deleted: true;
}

// Denormalised listing object
export interface IListing {
  id: UUID;
  type: 'listing';
  attribute: IListingAttributes | IDeletedListingAttributes;
  author?: IUser;
  images?: Array<IImage>;
}

// Denormalised ownListing object
export interface IOwnListing {
  id: UUID;
  type: 'ownListing';
  attributes: IOwnListingAttributes | IDeletedListingAttributes;
  author: ICurrentUser;
  images: Array<IImage>;
}

export const BOOKING_STATE_PENDING = 'pending';
export const BOOKING_STATE_ACCEPTED = 'accepted';
export const BOOKING_STATE_DECLINED = 'declined';
export const BOOKING_STATE_CANCELLED = 'cancelled';

export type BookingState =
  | typeof BOOKING_STATE_PENDING
  | typeof BOOKING_STATE_ACCEPTED
  | typeof BOOKING_STATE_DECLINED
  | typeof BOOKING_STATE_CANCELLED;

// Denormalised booking object
export interface IBooking {
  id: UUID;
  type: 'booking';
  attributes?: {
    end: Date;
    start: Date;
    displayStart?: Date;
    displayEnd?: Date;
    state?: BookingState;
  };
}

// A time slot that covers one day, having a start and end date.
export const TIME_SLOT_DAY = 'time-slot/day';
export type TimeSlots = typeof TIME_SLOT_DAY;

// Denormalised time slot object
export interface ITimeSlot {
  id: UUID;
  type: 'timeSlot';
  attributes?: {
    type: TimeSlots;
    end: Date;
    start: Date;
  };
}

// Denormalised availability exception object
export interface IAvailabilityException {
  id: UUID;
  type: 'availabilityException';
  attributes?: {
    end: Date;
    start: Date;
    seats: number;
  };
}

export interface ITransition {
  createdAt: Date;
  by: TxTransitionActors;
  transition: Transitions;
}

// Possible amount of stars in a review
export type ReviewRatings = 1 | 2 | 3 | 4 | 5;

// Review types: review of a provider and of a customer
export const REVIEW_TYPE_OF_PROVIDER = 'ofProvider';
export const REVIEW_TYPE_OF_CUSTOMER = 'ofCustomer';

export type ReviewTypes = typeof REVIEW_TYPE_OF_PROVIDER | typeof REVIEW_TYPE_OF_CUSTOMER;

// A review on a user
export interface IReview {
  id: UUID;
  attributes: {
    createdAt: Date;
    content?: string;
    rating?: ReviewRatings;
    state: string;
    type: ReviewTypes;
  };
  author?: IUser;
  subject?: IUser;
}

// A Stripe account entity
export interface IStripeAccount {
  id: UUID;
  type: 'stripeAccount';
  attributes?: {
    stripeAccountId: string;
    stripeAccountData?: string;
  };
}

export interface IDefaultPaymentMethod {
  id: UUID;
  type: 'stripePaymentMethod';
  attributes: {
    type: 'stripe-payment-method/card';
    stripePaymentMethodId: string;
    card: {
      brand: string;
      expirationMonth: number;
      expirationYear: string;
      last4Digits: string;
    };
  };
}

export const LINE_ITEM_NIGHT = 'line-item/night';
export const LINE_ITEM_DAY = 'line-item/day';
export const LINE_ITEM_UNITS = 'line-item/units';
export const LINE_ITEM_CUSTOMER_COMMISSION = 'line-item/customer-commission';
export const LINE_ITEM_PROVIDER_COMMISSION = 'line-item/provider-commission';
export const LINE_ITEM_SHIPPING_FEE = 'line-item/shipping-fee';
export const LINE_ITEM_PICKUP_FEE = 'line-item/pickup-fee';

export const LINE_ITEMS = [
  LINE_ITEM_NIGHT,
  LINE_ITEM_DAY,
  LINE_ITEM_UNITS,
  LINE_ITEM_CUSTOMER_COMMISSION,
  LINE_ITEM_PROVIDER_COMMISSION,
  LINE_ITEM_SHIPPING_FEE,
  LINE_ITEM_PICKUP_FEE,
];

export type lineItemUnitType =
  | typeof LINE_ITEM_NIGHT
  | typeof LINE_ITEM_DAY
  | typeof LINE_ITEM_UNITS;

const requiredLineItemPropType = (
  props: { [key: string]: any },
  propName: string,
  componentName: string
) => {
  const prop = props[propName];

  if (!prop || prop === '') {
    return new Error(`Missing line item code prop from ${componentName}.`);
  }
  if (!/^line-item\/.+/.test(prop)) {
    return new Error(`Invalid line item code value ${prop} passed to ${componentName}.`);
  }
};

interface ILineItem {
  code?: typeof requiredLineItemPropType;
  includeFor: ('customer' | 'provider')[];
  quantity?: Decimal;
  unitPrice: Money;
  lineTotal: boolean;
  reversal: boolean;
}

export type LineItems = ILineItem[];

// Denormalised transaction object
export interface ITransaction {
  id: UUID;
  type: 'transaction';
  attributes?: {
    createdAt?: Date;
    lastTransitionedAt: Date;
    lastTransition: Transitions;

    // An enquiry won't need a total sum nor a booking so these are
    // optional.
    payinTotal?: Money;
    payoutTotal?: Money;

    lineItems?: LineItems;
    transitions: ITransition[];
  };
  booking?: IBooking;
  listing?: IListing;
  customer?: IUser;
  provider?: IUser;
  reviews?: IReview[];
}

// Denormalised transaction message
export interface IMessage {
  id: UUID;
  type: 'Message';
  attributes: {
    createdAt: Date;
    content: string;
  };
  sender?: IUser;
}

// Pagination information in the response meta
export interface IPagination {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

// Search filter definition
interface IFilter {
  id: string;
  label?: ReactNode;
  type: string;
  group: 'primary' | 'secondary';
  queryParamNames: string[];
  config?: object;
}

export type FilterConfig = IFilter[];

export interface ISortConfig {
  active?: boolean;
  queryParamName: 'sort';
  relevanceKey: string;
  conflictingFilters: string[];
  options?: {
    key: 'createdAt' | '-createdAt' | 'price' | '-price' | 'relevance';
    label: string;
    longLabel?: string;
  };
}

export const ERROR_CODE_TRANSACTION_LISTING_NOT_FOUND = 'transaction-listing-not-found';
export const ERROR_CODE_TRANSACTION_INVALID_TRANSITION = 'transaction-invalid-transition';
export const ERROR_CODE_TRANSACTION_ALREADY_REVIEWED_BY_CUSTOMER =
  'transaction-already-reviewed-by-customer';
export const ERROR_CODE_TRANSACTION_ALREADY_REVIEWED_BY_PROVIDER =
  'transaction-already-reviewed-by-provider';
export const ERROR_CODE_TRANSACTION_BOOKING_TIME_NOT_AVAILABLE =
  'transaction-booking-time-not-available';
export const ERROR_CODE_TRANSACTION_LISTING_INSUFFICIENT_STOCK =
  'transaction-listing-insufficient-stock';
export const ERROR_CODE_PAYMENT_FAILED = 'transaction-payment-failed';
export const ERROR_CODE_CHARGE_ZERO_PAYIN = 'transaction-charge-zero-payin';
export const ERROR_CODE_CHARGE_ZERO_PAYOUT = 'transaction-charge-zero-payout';
export const ERROR_CODE_EMAIL_TAKEN = 'email-taken';
export const ERROR_CODE_EMAIL_NOT_FOUND = 'email-not-found';
export const ERROR_CODE_TOO_MANY_VERIFICATION_REQUESTS = 'email-too-many-verification-requests';
export const ERROR_CODE_UPLOAD_OVER_LIMIT = 'request-upload-over-limit';
export const ERROR_CODE_VALIDATION_INVALID_PARAMS = 'validation-invalid-params';
export const ERROR_CODE_VALIDATION_INVALID_VALUE = 'validation-invalid-value';
export const ERROR_CODE_NOT_FOUND = 'not-found';
export const ERROR_CODE_FORBIDDEN = 'forbidden';
export const ERROR_CODE_MISSING_STRIPE_ACCOUNT = 'transaction-missing-stripe-account';
export const ERROR_CODE_STOCK_OLD_TOTAL_MISMATCH = 'old-total-mismatch';

type ErrorCodes =
  | typeof ERROR_CODE_TRANSACTION_LISTING_NOT_FOUND
  | typeof ERROR_CODE_TRANSACTION_INVALID_TRANSITION
  | typeof ERROR_CODE_TRANSACTION_ALREADY_REVIEWED_BY_CUSTOMER
  | typeof ERROR_CODE_TRANSACTION_ALREADY_REVIEWED_BY_PROVIDER
  | typeof ERROR_CODE_PAYMENT_FAILED
  | typeof ERROR_CODE_CHARGE_ZERO_PAYIN
  | typeof ERROR_CODE_CHARGE_ZERO_PAYOUT
  | typeof ERROR_CODE_EMAIL_TAKEN
  | typeof ERROR_CODE_EMAIL_NOT_FOUND
  | typeof ERROR_CODE_TOO_MANY_VERIFICATION_REQUESTS
  | typeof ERROR_CODE_UPLOAD_OVER_LIMIT
  | typeof ERROR_CODE_VALIDATION_INVALID_PARAMS
  | typeof ERROR_CODE_VALIDATION_INVALID_VALUE
  | typeof ERROR_CODE_NOT_FOUND
  | typeof ERROR_CODE_FORBIDDEN
  | typeof ERROR_CODE_MISSING_STRIPE_ACCOUNT
  | typeof ERROR_CODE_STOCK_OLD_TOTAL_MISMATCH;

// API error
// TODO this is likely to change soonish
export interface IApiError {
  id: UUID;
  status: number;
  code: ErrorCodes;
  title: string;
  meta?: object;
}

// Storable error prop type. (Error object should not be stored as it is.)
export interface IError {
  type: 'error';
  name: string;
  message?: string;
  status?: number;
  statusText?: string;
  apiErrors?: IApiError[];
}

// Options for showing just date or date and time on BookingTimeInfo and OrderBreakdown
export const DATE_TYPE_DATE = 'date';
export const DATE_TYPE_DATETIME = 'datetime';

export type DateType = typeof DATE_TYPE_DATE | typeof DATE_TYPE_DATETIME;
