/**
 * Transitions
 *
 * These strings must sync with values defined in Flex API,
 * since transaction objects given by API contain info about last transitions.
 * All the actions in API side happen in transitions,
 * so we need to understand what those strings mean.
 */

// When a customer makes an order for a listing, a transaction is
// created with the initial request-payment transition.
// At this transition a PaymentIntent is created by Marketplace API.
// After this transition, the actual payment must be made on client-side directly to Stripe.
export const TRANSITION_REQUEST_PAYMENT = 'transition/request-payment';

// A customer can also initiate a transaction with an enquiry, and
// then transition that with a request.
export const TRANSITION_ENQUIRE = 'transition/enquire';
export const TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY = 'transition/request-payment-after-enquiry';

// Stripe SDK might need to ask 3D security from customer, in a separate front-end step.
// Therefore we need to make another transition to Marketplace API,
// to tell that the payment is confirmed.
export const TRANSITION_CONFIRM_PAYMENT = 'transition/confirm-payment';

// If the payment is not confirmed in the time limit set in transaction process (by default 15min)
// the transaction will expire automatically.
export const TRANSITION_EXPIRE_PAYMENT = 'transition/expire-payment';

// Provider can mark the product shipped/delivered
export const TRANSITION_MARK_DELIVERED = 'transition/mark-delivered';

// Customer can mark the product received (e.g. picked up from provider)
export const TRANSITION_MARK_RECEIVED_FROM_PURCHASED = 'transition/mark-received-from-purchased';

// Automatic cancellation happens if none marks the delivery happened
export const TRANSITION_AUTO_CANCEL = 'transition/auto-cancel';

// Operator can cancel the purchase before product has been marked as delivered / received
export const TRANSITION_CANCEL = 'transition/cancel';

// If provider has marked the product delivered (e.g. shipped),
// customer can then mark the product received
export const TRANSITION_MARK_RECEIVED = 'transition/mark-received';

// If customer doesn't mark the product received manually, it can happen automatically
export const TRANSITION_AUTO_MARK_RECEIVED = 'transition/auto-mark-received';

// When provider has marked the product delivered, customer can dispute the transaction
export const TRANSITION_DISPUTE = 'transition/dispute';

// If nothing is done to disputed transaction it ends up to Canceled state
export const TRANSITION_AUTO_CANCEL_FROM_DISPUTED = 'transition/auto-cancel-from-disputed';

// Operator can cancel disputed transaction manually
export const TRANSITION_CANCEL_FROM_DISPUTED = 'transition/cancel-from-disputed';

// Operator can mark the disputed transaction as received
export const TRANSITION_MARK_RECEIVED_FROM_DISPUTED = 'transition/mark-received-from-disputed';

// System moves transaction automatically from received state to complete state
// This makes it possible to to add notifications to that single transition.
export const TRANSITION_AUTO_COMPLETE = 'transition/auto-complete';

// Reviews are given through transaction transitions. Review 1 can be
// by provider or customer, and review 2 will be the other party of
// the transaction.
export const TRANSITION_REVIEW_1_BY_PROVIDER = 'transition/review-1-by-provider';
export const TRANSITION_REVIEW_2_BY_PROVIDER = 'transition/review-2-by-provider';
export const TRANSITION_REVIEW_1_BY_CUSTOMER = 'transition/review-1-by-customer';
export const TRANSITION_REVIEW_2_BY_CUSTOMER = 'transition/review-2-by-customer';
export const TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD = 'transition/expire-customer-review-period';
export const TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD = 'transition/expire-provider-review-period';
export const TRANSITION_EXPIRE_REVIEW_PERIOD = 'transition/expire-review-period';

export type Transitions =
  | typeof TRANSITION_REQUEST_PAYMENT
  | typeof TRANSITION_ENQUIRE
  | typeof TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY
  | typeof TRANSITION_CONFIRM_PAYMENT
  | typeof TRANSITION_EXPIRE_PAYMENT
  | typeof TRANSITION_MARK_DELIVERED
  | typeof TRANSITION_MARK_RECEIVED_FROM_PURCHASED
  | typeof TRANSITION_AUTO_CANCEL
  | typeof TRANSITION_CANCEL
  | typeof TRANSITION_MARK_RECEIVED
  | typeof TRANSITION_AUTO_MARK_RECEIVED
  | typeof TRANSITION_DISPUTE
  | typeof TRANSITION_AUTO_CANCEL_FROM_DISPUTED
  | typeof TRANSITION_CANCEL_FROM_DISPUTED
  | typeof TRANSITION_MARK_RECEIVED_FROM_DISPUTED
  | typeof TRANSITION_AUTO_COMPLETE
  | typeof TRANSITION_REVIEW_1_BY_PROVIDER
  | typeof TRANSITION_REVIEW_2_BY_PROVIDER
  | typeof TRANSITION_REVIEW_1_BY_CUSTOMER
  | typeof TRANSITION_REVIEW_2_BY_CUSTOMER
  | typeof TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD
  | typeof TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD
  | typeof TRANSITION_EXPIRE_REVIEW_PERIOD
  | typeof TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY;

/**
 * Actors
 *
 * There are 4 different actors that might initiate transitions:
 */

// Roles of actors that perform transaction transitions
export const TX_TRANSITION_ACTOR_CUSTOMER = 'customer';
export const TX_TRANSITION_ACTOR_PROVIDER = 'provider';
export const TX_TRANSITION_ACTOR_SYSTEM = 'system';
export const TX_TRANSITION_ACTOR_OPERATOR = 'operator';

export type TxTransitionActors =
  | typeof TX_TRANSITION_ACTOR_CUSTOMER
  | typeof TX_TRANSITION_ACTOR_PROVIDER
  | typeof TX_TRANSITION_ACTOR_SYSTEM
  | typeof TX_TRANSITION_ACTOR_OPERATOR;

/**
 * States
 *
 * These constants are only for making it clear how transitions work together.
 * You should not use these constants outside of this file.
 *
 * Note: these states are not in sync with states used transaction process definitions
 *       in Marketplace API. Only last transitions are passed along transaction object.
 */
const STATE_INITIAL = 'initial';
const STATE_ENQUIRY = 'enquiry';
const STATE_PENDING_PAYMENT = 'pending-payment';
const STATE_PAYMENT_EXPIRED = 'payment-expired';
const STATE_PURCHASED = 'purchased';
const STATE_DELIVERED = 'delivered';
const STATE_RECEIVED = 'received';
const STATE_DISPUTED = 'disputed';
const STATE_CANCELED = 'canceled';
const STATE_COMPLETED = 'completed';
const STATE_REVIEWED = 'reviewed';
const STATE_REVIEWED_BY_CUSTOMER = 'reviewed-by-customer';
const STATE_REVIEWED_BY_PROVIDER = 'reviewed-by-provider';

export type States =
  | typeof STATE_INITIAL
  | typeof STATE_ENQUIRY
  | typeof STATE_PENDING_PAYMENT
  | typeof STATE_PAYMENT_EXPIRED
  | typeof STATE_PURCHASED
  | typeof STATE_DELIVERED
  | typeof STATE_RECEIVED
  | typeof STATE_DISPUTED
  | typeof STATE_CANCELED
  | typeof STATE_COMPLETED
  | typeof STATE_REVIEWED
  | typeof STATE_REVIEWED_BY_CUSTOMER
  | typeof STATE_REVIEWED_BY_PROVIDER;

/**
 * Description of transaction process
 *
 * You should keep this in sync with transaction process defined in Marketplace API
 *
 * Note: we don't use yet any state machine library,
 *       but this description format is following Xstate (FSM library)
 *       https://xstate.js.org/docs/
 */

interface IStateTransitions {
  [key: string]: States;
}

interface IStates {
  [key: string]: {
    on?: IStateTransitions;
    type?: string;
  };
}

interface IStateDescription {
  id: string;
  initial: typeof STATE_INITIAL;
  states: IStates;
}

const stateDescription: IStateDescription = {
  // id is defined only to support Xstate format.
  // However if you have multiple transaction processes defined,
  // it is best to keep them in sync with transaction process aliases.
  id: 'flex-product-default-process/release-1',

  // This 'initial' state is a starting point for new transaction
  initial: STATE_INITIAL,

  // States
  states: {
    [STATE_INITIAL]: {
      on: {
        [TRANSITION_ENQUIRE]: STATE_ENQUIRY,
        [TRANSITION_REQUEST_PAYMENT]: STATE_PENDING_PAYMENT,
      },
    },
    [STATE_ENQUIRY]: {
      on: {
        [TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY]: STATE_PENDING_PAYMENT,
      },
    },

    [STATE_PENDING_PAYMENT]: {
      on: {
        [TRANSITION_EXPIRE_PAYMENT]: STATE_PAYMENT_EXPIRED,
        [TRANSITION_CONFIRM_PAYMENT]: STATE_PURCHASED,
      },
    },

    [STATE_PAYMENT_EXPIRED]: {},

    [STATE_PURCHASED]: {
      on: {
        [TRANSITION_MARK_DELIVERED]: STATE_DELIVERED,
        [TRANSITION_MARK_RECEIVED_FROM_PURCHASED]: STATE_RECEIVED,
        [TRANSITION_AUTO_CANCEL]: STATE_CANCELED,
        [TRANSITION_CANCEL]: STATE_CANCELED,
      },
    },

    [STATE_CANCELED]: {},

    [STATE_DELIVERED]: {
      on: {
        [TRANSITION_MARK_RECEIVED]: STATE_RECEIVED,
        [TRANSITION_AUTO_MARK_RECEIVED]: STATE_RECEIVED,
        [TRANSITION_DISPUTE]: STATE_DISPUTED,
      },
    },

    [STATE_DISPUTED]: {
      on: {
        [TRANSITION_AUTO_CANCEL_FROM_DISPUTED]: STATE_CANCELED,
        [TRANSITION_CANCEL_FROM_DISPUTED]: STATE_CANCELED,
        [TRANSITION_MARK_RECEIVED_FROM_DISPUTED]: STATE_RECEIVED,
      },
    },

    [STATE_RECEIVED]: {
      on: {
        [TRANSITION_AUTO_COMPLETE]: STATE_COMPLETED,
      },
    },

    [STATE_COMPLETED]: {
      on: {
        [TRANSITION_EXPIRE_REVIEW_PERIOD]: STATE_REVIEWED,
        [TRANSITION_REVIEW_1_BY_CUSTOMER]: STATE_REVIEWED_BY_CUSTOMER,
        [TRANSITION_REVIEW_1_BY_PROVIDER]: STATE_REVIEWED_BY_PROVIDER,
      },
    },

    [STATE_REVIEWED_BY_CUSTOMER]: {
      on: {
        [TRANSITION_REVIEW_2_BY_PROVIDER]: STATE_REVIEWED,
        [TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD]: STATE_REVIEWED,
      },
    },
    [STATE_REVIEWED_BY_PROVIDER]: {
      on: {
        [TRANSITION_REVIEW_2_BY_CUSTOMER]: STATE_REVIEWED,
        [TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD]: STATE_REVIEWED,
      },
    },
    [STATE_REVIEWED]: { type: 'final' },
  },
};

// Note: currently we assume that state description doesn't contain nested states.
const statesFromStateDescription = (description: IStateDescription): IStates =>
  description.states || {};

// Get all the transitions from states object in an array
const getTransitions = (states: IStates) => {
  const stateNames = Object.keys(states);

  const transitionsReducer = (transitionArray: any[], name: string) => {
    const stateTransitions: IStateTransitions | undefined = states[name] && states[name].on;
    const transitionKeys = stateTransitions ? Object.keys(stateTransitions) : [];

    return [
      ...transitionArray,
      ...transitionKeys.map(key => stateTransitions && { key, value: stateTransitions[key] }),
    ];
  };

  return stateNames.reduce(transitionsReducer, []);
};

// This is a list of all the transitions that this app should be able to handle.
export const TRANSITIONS: Array<Transitions> = getTransitions(
  statesFromStateDescription(stateDescription)
).map(t => t.key);
