/* eslint-disable comma-dangle */
import camelСaseKeys from 'camelcase-keys';
import { ThunkActionResult } from 'types/action';
import type { OfferProps, OffersProps } from 'types/card-props';
import type { ReviewsProps } from 'types/review-props';
import type { AuthData } from 'types/auth-data';
import type { CommentData } from 'types/comment-data';
import {
  getListOfOffersAction,
  updateOffersListAction,
  setIsLoadingAction,
  setIsErrorAction,
  getListOfCitiesAction,
  getListOfReviewsAction,
  getCurrentOfferByIdDataAction,
  getNearbyOffersAction,
  requireAuthorizationAction,
  requireLogoutAction,
  setLoginAction,
  setAvatarUrlAction,
  getCurrentCityAction,
  getSelectedPointAction,
} from 'store/action';
import { filterOffersList } from 'utils/utils';
import { INITIAL_CITY } from 'config/InitialCity';
import { LOCATIONS_LIST } from 'config/LocationsList';
import { AppRoute } from 'config/AppRoute';
import { UserStatus } from 'config/UserStatus';
import { INITIAL_LOGIN } from 'config/InitialLogin';
import { INITIAL_AVATAR_URL } from 'config/InitialAvatarUrl';
import { filterReviewsList } from 'utils/utils';
import {
  saveToken,
  dropToken,
  saveLoginName,
  getLoginName,
  dropLoginName,
  saveAvatarUrl,
  getAvatarUrl,
  dropAvatarUrl,
} from 'services/token';

function fetchOffersList(): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    try {
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
      dispatch(setIsErrorAction(false));
    } catch (error) {
      dispatch(setIsErrorAction(true));
    }
  };
}

function fetchOfferData(id: number): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    try {
      const { data } = await api.get<ReviewsProps>(`/comments/${id}`);
      dispatch(
        getListOfReviewsAction(
          filterReviewsList(
            camelСaseKeys(data, {
              deep: true,
            }),
          ),
        ),
      );
      dispatch(setIsLoadingAction(false));
      dispatch(setIsErrorAction(false));
    } catch (error) {
      dispatch(setIsErrorAction(true));
    }

    try {
      const { data } = await api.get<OfferProps>(`/hotels/${id}`);
      dispatch(
        getCurrentOfferByIdDataAction(
          camelСaseKeys(data, {
            deep: true,
          }),
        ),
      );

      dispatch(getCurrentCityAction(data.city));
      dispatch(getSelectedPointAction(data.location));
      dispatch(setIsLoadingAction(false));
      dispatch(setIsErrorAction(false));
    } catch (error) {
      dispatch(setIsErrorAction(true));
    }

    try {
      const { data } = await api.get<OffersProps>(`/hotels/${id}/nearby`);
      dispatch(
        getNearbyOffersAction(
          camelСaseKeys(data, {
            deep: true,
          }),
        ),
      );
      dispatch(setIsLoadingAction(false));
      dispatch(setIsErrorAction(false));
    } catch (error) {
      dispatch(setIsErrorAction(true));
    }
  };
}

function checkAuthAction(): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    const { data } = await api.get(AppRoute.Login);
    if (data) {
      dispatch(requireAuthorizationAction(UserStatus.Auth));
      dispatch(setLoginAction(getLoginName()));
      dispatch(setAvatarUrlAction(getAvatarUrl()));
    }
  };
}

function loginAction({ login: email, password }: AuthData): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    const { data } = await api.post(AppRoute.Login, {
      email,
      password,
    });
    const result = camelСaseKeys(data, {
      deep: true,
    });

    saveToken(result.token);
    saveAvatarUrl(result.avatarUrl);
    saveLoginName(email);

    dispatch(setLoginAction(email));
    dispatch(setAvatarUrlAction(result.avatarUrl));

    dispatch(requireAuthorizationAction(UserStatus.Auth));
  };
}

function logoutAction(): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    api.delete(AppRoute.Logout);

    dropToken();
    dropLoginName();
    dropAvatarUrl();

    dispatch(requireLogoutAction());
    dispatch(setLoginAction(INITIAL_LOGIN));
    dispatch(setAvatarUrlAction(INITIAL_AVATAR_URL));
  };
}

function addComment(
  { rating, comment }: CommentData,
  id: number,
): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    try {
      const { data } = await api.post(`${AppRoute.Сomments}${id}`, {
        rating,
        comment,
      });
      dispatch(
        getListOfReviewsAction(
          camelСaseKeys(data, {
            deep: true,
          }),
        ),
      );
    } catch (error) {
      dispatch(setIsErrorAction(true));
    }
  };
}

export {
  fetchOffersList,
  fetchOfferData,
  checkAuthAction,
  loginAction,
  logoutAction,
  addComment,
};
