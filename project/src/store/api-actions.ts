/* eslint-disable no-console */
/* eslint-disable comma-dangle */
import camelСaseKeys from 'camelcase-keys';
import { ThunkActionResult } from 'types/action';
import type { OfferProps, OffersProps } from 'types/card-props';
import type { ReviewsProps } from 'types/review-props';
import type { AuthData } from 'types/auth-data';
import {
  getListOfOffersAction,
  updateOffersListAction,
  setIsLoadingAction,
  getListOfCitiesAction,
  getListOfReviewsAction,
  getCurrentOfferByIdDataAction,
  getNearbyOffersAction,
  requireAuthorizationAction,
  requireLogoutAction,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  redirectToRouteAction,
  setLoginAction,
} from 'store/action';
import { filterOffersList } from 'utils/utils';
import { INITIAL_CITY } from 'config/InitialCity';
import { LOCATIONS_LIST } from 'config/LocationsList';
import { AppRoute } from 'config/AppRoute';
import { UserStatus } from 'config/UserStatus';
import { INITIAL_LOGIN } from 'config/InitialLogin';
import { saveToken, dropToken, Token } from 'services/token';

function fetchOffersList(): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    const { data } = await api.get<OffersProps>('/hotels');
    const offers = camelСaseKeys(data, {
      deep: true,
    });

    dispatch(getListOfOffersAction(offers));
    dispatch(
      updateOffersListAction(filterOffersList(INITIAL_CITY.name, offers)),
    );
    dispatch(getListOfCitiesAction(LOCATIONS_LIST));
    dispatch(setIsLoadingAction(false));
  };
}

function fetchOfferData(id: number): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    await api.get<ReviewsProps>(`/comments/${id}`).then(({ data }) => {
      dispatch(
        getListOfReviewsAction(
          camelСaseKeys(data, {
            deep: true,
          }),
        ),
      );
    });

    await api.get<OfferProps>(`/hotels/${id}`).then(({ data }) => {
      dispatch(
        getCurrentOfferByIdDataAction(
          camelСaseKeys(data, {
            deep: true,
          }),
        ),
      );
    });

    await api.get<OffersProps>(`/hotels/${id}/nearby`).then(({ data }) => {
      dispatch(
        getNearbyOffersAction(
          camelСaseKeys(data, {
            deep: true,
          }),
        ),
      );
    });
  };
}

function checkAuthAction(): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    await api.get(AppRoute.Login).then(() => {
      dispatch(requireAuthorizationAction(UserStatus.Auth));
    });
  };
}

function loginAction({ login: email, password }: AuthData): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    console.log(email, password);
    const {
      data: { token },
    } = await api.post<{ token: Token }>(AppRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorizationAction(UserStatus.Auth));
    dispatch(setLoginAction(email));
  };
}

function logoutAction(): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    api.delete(AppRoute.Logout);
    dropToken();
    dispatch(requireLogoutAction());
    dispatch(setLoginAction(INITIAL_LOGIN));
  };
}

export {
  fetchOffersList,
  fetchOfferData,
  checkAuthAction,
  loginAction,
  logoutAction,
};
