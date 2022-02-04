import { denormalisedResponseEntities, ensureOwnListing } from '../util/data';
import { storableError } from '../util/errors';
import { transitionsToRequested } from '../util/transaction';
import { LISTING_STATE_DRAFT } from '../util/types';
import * as log from '../util/log';
import { authInfo } from './Auth.duck';
import { stripeAccountCreateSuccess } from './stripeConnectAccount.duck';
import { util as sdkUtil } from '../util/sdkLoader';
import { ICurrentUser, IError, IUser } from '../util/types-dev';
import { RootState } from '../store';

// ================ Action types ================ //
enum UserActionType {
  CURRENT_USER_SHOW_REQUEST = 'app/user/CURRENT_USER_SHOW_REQUEST',
  CURRENT_USER_SHOW_SUCCESS = 'app/user/CURRENT_USER_SHOW_SUCCESS',
  CURRENT_USER_SHOW_ERROR = 'app/user/CURRENT_USER_SHOW_ERROR',
  CLEAR_CURRENT_USER = 'app/user/CLEAR_CURRENT_USER',
  FETCH_CURRENT_USER_HAS_LISTINGS_REQUEST = 'app/user/FETCH_CURRENT_USER_HAS_LISTINGS_REQUEST',
  FETCH_CURRENT_USER_HAS_LISTINGS_SUCCESS = 'app/user/FETCH_CURRENT_USER_HAS_LISTINGS_SUCCESS',
  FETCH_CURRENT_USER_HAS_LISTINGS_ERROR = 'app/user/FETCH_CURRENT_USER_HAS_LISTINGS_ERROR',
  FETCH_CURRENT_USER_NOTIFICATIONS_REQUEST = 'app/user/FETCH_CURRENT_USER_NOTIFICATIONS_REQUEST',
  FETCH_CURRENT_USER_NOTIFICATIONS_SUCCESS = 'app/user/FETCH_CURRENT_USER_NOTIFICATIONS_SUCCESS',
  FETCH_CURRENT_USER_NOTIFICATIONS_ERROR = 'app/user/FETCH_CURRENT_USER_NOTIFICATIONS_ERROR',
  FETCH_CURRENT_USER_HAS_ORDERS_REQUEST = 'app/user/FETCH_CURRENT_USER_HAS_ORDERS_REQUEST',
  FETCH_CURRENT_USER_HAS_ORDERS_SUCCESS = 'app/user/FETCH_CURRENT_USER_HAS_ORDERS_SUCCESS',
  FETCH_CURRENT_USER_HAS_ORDERS_ERROR = 'app/user/FETCH_CURRENT_USER_HAS_ORDERS_ERROR',
  SEND_VERIFICATION_EMAIL_REQUEST = 'app/user/SEND_VERIFICATION_EMAIL_REQUEST',
  SEND_VERIFICATION_EMAIL_SUCCESS = 'app/user/SEND_VERIFICATION_EMAIL_SUCCESS',
  SEND_VERIFICATION_EMAIL_ERROR = 'app/user/SEND_VERIFICATION_EMAIL_ERROR',
}

// ================ Reducer ================ //

const mergeCurrentUser = (
  oldCurrentUser: ICurrentUser | null,
  newCurrentUser: ICurrentUser | null
) => {
  const { id: oId, type: oType, attributes: oAttr, ...oldRelationships } = oldCurrentUser || {};
  const { id, type, attributes, ...relationships } = newCurrentUser || {};

  // Passing null will remove currentUser entity.
  // Only relationships are merged.
  // TODO figure out if sparse fields handling needs a better handling.
  return newCurrentUser === null
    ? null
    : oldCurrentUser === null
    ? newCurrentUser
    : { id, type, attributes, ...oldRelationships, ...relationships };
};

interface IEmptyAction {
  type: null;
  payload: null;
}

interface ICurrentUserShowRequest {
  type: UserActionType.CURRENT_USER_SHOW_REQUEST;
  payload: null;
}

interface ICurrentUserShowSuccess {
  type: UserActionType.CURRENT_USER_SHOW_SUCCESS;
  payload: ICurrentUser;
}

interface ICurrentUserShowError {
  type: UserActionType.CURRENT_USER_SHOW_ERROR;
  payload: IError;
}

interface IClearCurrentUser {
  type: UserActionType.CLEAR_CURRENT_USER;
  payload: null;
}

interface IFetchCurrentUserHasListingsRequest {
  type: UserActionType.FETCH_CURRENT_USER_HAS_LISTINGS_REQUEST;
  payload: null;
}

interface IFetchCurrentUserHasListingsSuccess {
  type: UserActionType.FETCH_CURRENT_USER_HAS_LISTINGS_SUCCESS;
  payload: { hasListings: boolean };
}

interface IFetchCurrentUserHasListingsError {
  type: UserActionType.FETCH_CURRENT_USER_HAS_LISTINGS_ERROR;
  payload: IError;
}

interface IFetchCurrentUserNotificationsRequest {
  type: UserActionType.FETCH_CURRENT_USER_NOTIFICATIONS_REQUEST;
  payload: null;
}

interface IFetchCurrentUserNotificationsSuccess {
  type: UserActionType.FETCH_CURRENT_USER_NOTIFICATIONS_SUCCESS;
  payload: FixMeLater;
}

interface IFetchCurrentUserNotificationsError {
  type: UserActionType.FETCH_CURRENT_USER_NOTIFICATIONS_ERROR;
  payload: FixMeLater;
}

interface IFetchCurrentUserHasOrdersRequest {
  type: UserActionType.FETCH_CURRENT_USER_HAS_ORDERS_REQUEST;
  payload: null;
}

interface IFetchCurrentUserHasOrdersSuccess {
  type: UserActionType.FETCH_CURRENT_USER_HAS_ORDERS_SUCCESS;
  payload: FixMeLater;
}

interface IFetchCurrentUserHasOrdersError {
  type: UserActionType.FETCH_CURRENT_USER_HAS_ORDERS_ERROR;
  payload: FixMeLater;
}

interface ISendVerificationEmailRequest {
  type: UserActionType.SEND_VERIFICATION_EMAIL_REQUEST;
  payload: null;
}

interface ISendVerificationEmailSuccess {
  type: UserActionType.SEND_VERIFICATION_EMAIL_SUCCESS;
  payload: FixMeLater;
}

interface ISendVerificationEmailError {
  type: UserActionType.SEND_VERIFICATION_EMAIL_ERROR;
  payload: FixMeLater;
}

type UserAction =
  | IEmptyAction
  | ICurrentUserShowRequest
  | ICurrentUserShowSuccess
  | ICurrentUserShowError
  | IClearCurrentUser
  | IFetchCurrentUserHasListingsRequest
  | IFetchCurrentUserHasListingsSuccess
  | IFetchCurrentUserHasListingsError
  | IFetchCurrentUserNotificationsRequest
  | IFetchCurrentUserNotificationsSuccess
  | IFetchCurrentUserNotificationsError
  | IFetchCurrentUserHasOrdersRequest
  | IFetchCurrentUserHasOrdersSuccess
  | IFetchCurrentUserHasOrdersError
  | ISendVerificationEmailRequest
  | ISendVerificationEmailSuccess
  | ISendVerificationEmailError;

interface IUserState {
  currentUser: ICurrentUser | null;
  currentUserShowError: IError | null;
  currentUserHasListings: boolean;
  currentUserHasListingsError: IError | null;
  currentUserNotificationCount: number;
  currentUserNotificationCountError: DynamicObject | null;
  currentUserHasOrders: DynamicObject | null; // This is not fetched unless unverified emails exist
  currentUserHasOrdersError: IError | null;
  sendVerificationEmailInProgress: boolean;
  sendVerificationEmailError: IError | null;
}

const initialState: IUserState = {
  currentUser: null,
  currentUserShowError: null,
  currentUserHasListings: false,
  currentUserHasListingsError: null,
  currentUserNotificationCount: 0,
  currentUserNotificationCountError: null,
  currentUserHasOrders: null, // This is not fetched unless unverified emails exist
  currentUserHasOrdersError: null,
  sendVerificationEmailInProgress: false,
  sendVerificationEmailError: null,
};

export default function reducer(
  state = initialState,
  action: UserAction = { type: null, payload: null }
) {
  const { type, payload } = action;

  switch (type) {
    case UserActionType.CURRENT_USER_SHOW_REQUEST:
      return { ...state, currentUserShowError: null };
    case UserActionType.CURRENT_USER_SHOW_SUCCESS:
      return {
        ...state,
        currentUser: mergeCurrentUser(state.currentUser, payload as ICurrentUser | null),
      };
    case UserActionType.CURRENT_USER_SHOW_ERROR:
      // eslint-disable-next-line no-console
      console.error(payload);
      return { ...state, currentUserShowError: payload };

    case UserActionType.CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
        currentUserShowError: null,
        currentUserHasListings: false,
        currentUserHasListingsError: null,
        currentUserNotificationCount: 0,
        currentUserNotificationCountError: null,
      };

    case UserActionType.FETCH_CURRENT_USER_HAS_LISTINGS_REQUEST:
      return { ...state, currentUserHasListingsError: null };
    case UserActionType.FETCH_CURRENT_USER_HAS_LISTINGS_SUCCESS:
      return {
        ...state,
        currentUserHasListings: (payload as { hasListings: boolean }).hasListings,
      };
    case UserActionType.FETCH_CURRENT_USER_HAS_LISTINGS_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, currentUserHasListingsError: payload };

    case UserActionType.FETCH_CURRENT_USER_NOTIFICATIONS_REQUEST:
      return { ...state, currentUserNotificationCountError: null };
    case UserActionType.FETCH_CURRENT_USER_NOTIFICATIONS_SUCCESS:
      return { ...state, currentUserNotificationCount: payload.transactions.length };
    case UserActionType.FETCH_CURRENT_USER_NOTIFICATIONS_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, currentUserNotificationCountError: payload };

    case UserActionType.FETCH_CURRENT_USER_HAS_ORDERS_REQUEST:
      return { ...state, currentUserHasOrdersError: null };
    case UserActionType.FETCH_CURRENT_USER_HAS_ORDERS_SUCCESS:
      return { ...state, currentUserHasOrders: payload.hasOrders };
    case UserActionType.FETCH_CURRENT_USER_HAS_ORDERS_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, currentUserHasOrdersError: payload };

    case UserActionType.SEND_VERIFICATION_EMAIL_REQUEST:
      return {
        ...state,
        sendVerificationEmailInProgress: true,
        sendVerificationEmailError: null,
      };
    case UserActionType.SEND_VERIFICATION_EMAIL_SUCCESS:
      return {
        ...state,
        sendVerificationEmailInProgress: false,
      };
    case UserActionType.SEND_VERIFICATION_EMAIL_ERROR:
      return {
        ...state,
        sendVerificationEmailInProgress: false,
        sendVerificationEmailError: payload,
      };
    default:
      return state;
  }
}

// ================ Selectors ================ //

export const hasCurrentUserErrors = (state: RootState | FixMeLater) => {
  const { user } = state;
  return (
    user.currentUserShowError ||
    user.currentUserHasListingsError ||
    user.currentUserNotificationCountError ||
    user.currentUserHasOrdersError
  );
};

export const verificationSendingInProgress = (state: RootState | FixMeLater) => {
  return state.user.sendVerificationEmailInProgress;
};

// ================ Action creators ================ //

export const currentUserShowRequest = () => ({ type: UserActionType.CURRENT_USER_SHOW_REQUEST });

export const currentUserShowSuccess = (user: IUser | null) => ({
  type: UserActionType.CURRENT_USER_SHOW_SUCCESS,
  payload: user,
});

export const currentUserShowError = (e: FixMeLater) => ({
  type: UserActionType.CURRENT_USER_SHOW_ERROR,
  payload: e,
  error: true,
});

export const clearCurrentUser = () => ({ type: UserActionType.CLEAR_CURRENT_USER });

const fetchCurrentUserHasListingsRequest = () => ({
  type: UserActionType.FETCH_CURRENT_USER_HAS_LISTINGS_REQUEST,
  payload: null,
});

export const fetchCurrentUserHasListingsSuccess = (hasListings: boolean) => ({
  type: UserActionType.FETCH_CURRENT_USER_HAS_LISTINGS_SUCCESS,
  payload: { hasListings },
});

const fetchCurrentUserHasListingsError = (e: FixMeLater) => ({
  type: UserActionType.FETCH_CURRENT_USER_HAS_LISTINGS_ERROR,
  error: true,
  payload: e,
});

const fetchCurrentUserNotificationsRequest = () => ({
  type: UserActionType.FETCH_CURRENT_USER_NOTIFICATIONS_REQUEST,
});

export const fetchCurrentUserNotificationsSuccess = (transactions: FixMeLater) => ({
  type: UserActionType.FETCH_CURRENT_USER_NOTIFICATIONS_SUCCESS,
  payload: { transactions },
});

const fetchCurrentUserNotificationsError = (e: FixMeLater) => ({
  type: UserActionType.FETCH_CURRENT_USER_NOTIFICATIONS_ERROR,
  error: true,
  payload: e,
});

const fetchCurrentUserHasOrdersRequest = () => ({
  type: UserActionType.FETCH_CURRENT_USER_HAS_ORDERS_REQUEST,
});

export const fetchCurrentUserHasOrdersSuccess = (hasOrders: FixMeLater) => ({
  type: UserActionType.FETCH_CURRENT_USER_HAS_ORDERS_SUCCESS,
  payload: { hasOrders },
});

const fetchCurrentUserHasOrdersError = (e: FixMeLater) => ({
  type: UserActionType.FETCH_CURRENT_USER_HAS_ORDERS_ERROR,
  error: true,
  payload: e,
});

export const sendVerificationEmailRequest = () => ({
  type: UserActionType.SEND_VERIFICATION_EMAIL_REQUEST,
});

export const sendVerificationEmailSuccess = () => ({
  type: UserActionType.SEND_VERIFICATION_EMAIL_SUCCESS,
});

export const sendVerificationEmailError = (e: FixMeLater) => ({
  type: UserActionType.SEND_VERIFICATION_EMAIL_ERROR,
  error: true,
  payload: e,
});

// ================ Thunks ================ //

export const fetchCurrentUserHasListings = () => (
  dispatch: FixMeLater,
  getState: FixMeLater,
  sdk: FixMeLater
) => {
  dispatch(fetchCurrentUserHasListingsRequest());
  const { currentUser } = getState().user;

  if (!currentUser) {
    dispatch(fetchCurrentUserHasListingsSuccess(false));
    return Promise.resolve(null);
  }

  const params = {
    // Since we are only interested in if the user has
    // listings, we only need at most one result.
    page: 1,
    per_page: 1,
  };

  return sdk.ownListings
    .query(params)
    .then((response: FixMeLater) => {
      const hasListings = response.data.data && response.data.data.length > 0;

      const hasPublishedListings =
        hasListings &&
        // @ts-ignore
        ensureOwnListing(response.data.data[0]).attributes.state !== LISTING_STATE_DRAFT;
      dispatch(fetchCurrentUserHasListingsSuccess(!!hasPublishedListings));
    })
    .catch((e: FixMeLater) => dispatch(fetchCurrentUserHasListingsError(storableError(e))));
};

export const fetchCurrentUserHasOrders = () => (
  dispatch: FixMeLater,
  getState: FixMeLater,
  sdk: FixMeLater
) => {
  dispatch(fetchCurrentUserHasOrdersRequest());

  if (!getState().user.currentUser) {
    dispatch(fetchCurrentUserHasOrdersSuccess(false));
    return Promise.resolve(null);
  }

  const params = {
    only: 'order',
    page: 1,
    per_page: 1,
  };

  return sdk.transactions
    .query(params)
    .then((response: FixMeLater) => {
      const hasOrders = response.data.data && response.data.data.length > 0;
      dispatch(fetchCurrentUserHasOrdersSuccess(!!hasOrders));
    })
    .catch((e: FixMeLater) => dispatch(fetchCurrentUserHasOrdersError(storableError(e))));
};

// Notificaiton page size is max (100 items on page)
const NOTIFICATION_PAGE_SIZE = 100;

export const fetchCurrentUserNotifications = () => (
  dispatch: FixMeLater,
  getState: FixMeLater,
  sdk: FixMeLater
) => {
  dispatch(fetchCurrentUserNotificationsRequest());

  const apiQueryParams = {
    only: 'sale',
    last_transitions: transitionsToRequested,
    page: 1,
    per_page: NOTIFICATION_PAGE_SIZE,
  };

  sdk.transactions
    .query(apiQueryParams)
    .then((response: FixMeLater) => {
      const transactions = response.data.data;
      dispatch(fetchCurrentUserNotificationsSuccess(transactions));
    })
    .catch((e: FixMeLater) => dispatch(fetchCurrentUserNotificationsError(storableError(e))));
};

export const fetchCurrentUser = (params = null) => (
  dispatch: FixMeLater,
  getState: FixMeLater,
  sdk: FixMeLater
) => {
  dispatch(currentUserShowRequest());
  const { isAuthenticated } = getState().Auth;

  if (!isAuthenticated) {
    // Make sure current user is null
    dispatch(currentUserShowSuccess(null));
    return Promise.resolve({});
  }

  const parameters = params || {
    include: ['profileImage', 'stripeAccount'],
    'fields.image': [
      'variants.square-small',
      'variants.square-small2x',
      'variants.square-xsmall',
      'variants.square-xsmall2x',
    ],
    'imageVariant.square-xsmall': sdkUtil.objectQueryString({
      w: 40,
      h: 40,
      fit: 'crop',
    }),
    'imageVariant.square-xsmall2x': sdkUtil.objectQueryString({
      w: 80,
      h: 80,
      fit: 'crop',
    }),
  };

  return sdk.currentUser
    .show(parameters)
    .then((response: FixMeLater) => {
      const entities = denormalisedResponseEntities(response);
      if (entities.length !== 1) {
        throw new Error('Expected a resource in the sdk.currentUser.show response');
      }
      const currentUser = entities[0];

      // Save stripeAccount to store.stripe.stripeAccount if it exists
      if (currentUser.stripeAccount) {
        dispatch(stripeAccountCreateSuccess(currentUser.stripeAccount));
      }

      // set current user id to the logger
      log.setUserId(currentUser.id.uuid);
      dispatch(currentUserShowSuccess(currentUser));
      return currentUser;
    })
    .then((currentUser: ICurrentUser) => {
      dispatch(fetchCurrentUserHasListings());
      dispatch(fetchCurrentUserNotifications());
      if (!currentUser.attributes.emailVerified) {
        dispatch(fetchCurrentUserHasOrders());
      }

      // Make sure auth info is up to date
      dispatch(authInfo());
    })
    .catch((e: FixMeLater) => {
      // Make sure auth info is up to date
      dispatch(authInfo());
      // @ts-ignore
      log.error(e, 'fetch-current-user-failed');
      dispatch(currentUserShowError(storableError(e)));
    });
};

export const sendVerificationEmail = () => (
  dispatch: FixMeLater,
  getState: FixMeLater,
  sdk: FixMeLater
) => {
  if (verificationSendingInProgress(getState())) {
    return Promise.reject(new Error('Verification email sending already in progress'));
  }
  dispatch(sendVerificationEmailRequest());
  return sdk.currentUser
    .sendVerificationEmail()
    .then(() => dispatch(sendVerificationEmailSuccess()))
    .catch((e: FixMeLater) => dispatch(sendVerificationEmailError(storableError(e))));
};
