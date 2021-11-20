/* eslint-disable comma-dangle */
import camelСaseKeys from 'camelcase-keys';
import { ThunkActionResult } from 'types/action';
import type { OfferProps, OffersProps } from 'types/card-props';
import type { ReviewsProps } from 'types/review-props';
import type { AuthData } from 'types/auth-data';
import type { CommentData } from 'types/comment-data';
import { DataStatus } from 'config/data-status';
import {
  getListOfOffersAction,
  updateOffersListAction,
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
  updateOfferAction,
  getListOfFavoriteCardsAction,
  getOffersStatusAction,
  getOfferPageStatusAction,
  getFavoritesOffersStatusAction,
  getSendedCommentStatusAction,
} from 'store/action';
import { filterOffersList } from 'utils/sorting-utils';
import { LOCATIONS_LIST } from 'config/locations-list';
import { AppRoute } from 'config/app-route';
import { UserStatus } from 'config/user-status';
import { INITIAL_LOGIN } from 'config/initial-login';
import { INITIAL_AVATAR_URL } from 'config/initial-avatar-url';
import { filterReviewsList } from 'utils/sorting-utils';
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

function fetchOffersList(city: string): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    dispatch(getOffersStatusAction(DataStatus.IsLoading));

    try {
      const { data } = await api.get<OffersProps>('/hotels');

      const isOffersAbsent =
        data?.filter((offer) => offer?.city?.name === city).length === 0;

      const offers = camelСaseKeys(data, {
        deep: true,
      });

      dispatch(getListOfOffersAction(offers));
      dispatch(updateOffersListAction(filterOffersList(city, offers)));
      dispatch(getListOfCitiesAction(LOCATIONS_LIST));

      if (isOffersAbsent) {
        dispatch(getOffersStatusAction(DataStatus.IsEmpty));
      }

      dispatch(getOffersStatusAction(DataStatus.IsLoaded));
    } catch (error) {
      dispatch(getOffersStatusAction(DataStatus.NotLoaded));
    }
  };
}

function fetchOfferData(id: number): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    dispatch(getOfferPageStatusAction(DataStatus.IsLoading));

    try {
      const offer = await api.get<OfferProps>(`/hotels/${id}`);

      const comments = await api.get<ReviewsProps>(`/comments/${id}`);

      const offersNearby = await api.get<OffersProps>(`/hotels/${id}/nearby`);

      dispatch(
        getCurrentOfferByIdDataAction(
          camelСaseKeys(offer.data, {
            deep: true,
          }),
        ),
      );
      dispatch(getCurrentCityAction(offer.data.city));
      dispatch(getSelectedPointAction(offer.data.location));

      dispatch(
        getListOfReviewsAction(
          filterReviewsList(
            camelСaseKeys(comments.data, {
              deep: true,
            }),
          ),
        ),
      );

      dispatch(
        getNearbyOffersAction(
          camelСaseKeys(offersNearby.data, {
            deep: true,
          }),
        ),
      );

      dispatch(getOfferPageStatusAction(DataStatus.IsLoaded));
    } catch (error) {
      dispatch(getOfferPageStatusAction(DataStatus.NotLoaded));
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
    try {
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
    } catch (error) {
      dispatch(requireAuthorizationAction(UserStatus.Error));
    }
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
    dispatch(getSendedCommentStatusAction(DataStatus.IsSending));

    try {
      const { data } = await api.post(`${AppRoute.Сomments}${id}`, {
        rating,
        comment,
      });

      dispatch(
        getListOfReviewsAction(
          filterReviewsList(
            camelСaseKeys(data, {
              deep: true,
            }),
          ),
        ),
      );

      if (data) {
        dispatch(getSendedCommentStatusAction(DataStatus.IsSended));
      }
    } catch (error) {
      dispatch(getSendedCommentStatusAction(DataStatus.NotLoaded));
    }
  };
}

function addToFavorites(offerId: number, status: boolean): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    const { data } = await api.post<OfferProps>(
      `${AppRoute.FavoriteAPI}/${offerId}/${Number(!status)}`,
    );

    dispatch(
      updateOfferAction(
        camelСaseKeys(data, {
          deep: true,
        }),
      ),
    );
    dispatch(fetchFavoriteList());
  };
}

function fetchFavoriteList(): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    dispatch(getFavoritesOffersStatusAction(DataStatus.IsLoading));

    try {
      const { data } = await api.get<OffersProps>(`${AppRoute.FavoriteAPI}`);
      dispatch(
        getListOfFavoriteCardsAction(
          camelСaseKeys(data, {
            deep: true,
          }),
        ),
      );

      dispatch(getFavoritesOffersStatusAction(DataStatus.IsLoaded));

      if (data.length === 0) {
        dispatch(getFavoritesOffersStatusAction(DataStatus.IsEmpty));
      }
    } catch (error) {
      dispatch(getFavoritesOffersStatusAction(DataStatus.NotLoaded));
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
  addToFavorites,
  fetchFavoriteList,
};
