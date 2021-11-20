/* eslint-disable comma-dangle */
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from 'services/api';
import { filterOffersList } from 'utils/sorting-utils';
import { filterReviewsList } from 'utils/sorting-utils';
import type { AuthData } from 'types/auth-data';
import { State } from 'types/state';
import { AppRoute } from 'config/app-route';
import { UserStatus } from 'config/user-status';
import { DataStatus } from 'config/data-status';
import { LOCATIONS_LIST } from 'config/locations-list';
import {
  checkAuthAction,
  fetchOffersList,
  loginAction,
  logoutAction,
  fetchOfferData,
  fetchFavoriteList,
  addComment,
} from 'store/api-actions';
import {
  requireAuthorizationAction,
  setLoginAction,
  getListOfOffersAction,
  getOffersStatusAction,
  updateOffersListAction,
  getListOfCitiesAction,
  setAvatarUrlAction,
  requireLogoutAction,
  getOfferPageStatusAction,
  getCurrentOfferByIdDataAction,
  getCurrentCityAction,
  getSelectedPointAction,
  getListOfReviewsAction,
  getNearbyOffersAction,
  getFavoritesOffersStatusAction,
  getListOfFavoriteCardsAction,
  getSendedCommentStatusAction,
} from 'store/action';
import {
  fakeOffers,
  fakeReviews,
  userCommentPost,
  userCommentResponse,
} from 'mocks/mocks';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();

    mockAPI.onGet(AppRoute.Login).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      requireAuthorizationAction(UserStatus.Auth),
      setLoginAction(''),
      setAvatarUrlAction(''),
    ]);
  });

  it('should dispatch RequriedAuthorization when POST /login', async () => {
    const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };

    const store = mockStore();

    mockAPI.onPost(AppRoute.Login).reply(200, {
      token: 'secret',
      avatarUrl: 'https://8.react.pages.academy/static/avatar/5.jpg',
    });

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    expect(store.getActions()).toEqual([
      setLoginAction('test@test.ru'),
      setAvatarUrlAction('https://8.react.pages.academy/static/avatar/5.jpg'),
      requireAuthorizationAction(UserStatus.Auth),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(3);
    expect(Storage.prototype.setItem).toBeCalledWith(
      'six-cities-token',
      'secret',
    );
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI.onDelete(AppRoute.Logout).reply(204);

    const store = mockStore();

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([
      requireLogoutAction(),
      setLoginAction(''),
      setAvatarUrlAction(''),
    ]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(3);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });

  it('should dispatch fetchOffersList when GET /hotels', async () => {
    const store = mockStore();

    mockAPI.onGet('/hotels').reply(200, fakeOffers);

    await store.dispatch(fetchOffersList('Cologne'));

    expect(store.getActions()).toEqual([
      getOffersStatusAction(DataStatus.IsLoading),
      getListOfOffersAction(fakeOffers),
      updateOffersListAction(filterOffersList('Cologne', fakeOffers)),
      getListOfCitiesAction(LOCATIONS_LIST),
      getOffersStatusAction(DataStatus.IsEmpty),
      getOffersStatusAction(DataStatus.IsLoaded),
    ]);
  });

  it('should dispatch fetchOfferData when GET /hotels:id', async () => {
    const store = mockStore();

    mockAPI.onGet('/hotels/1').reply(200, fakeOffers[0]);
    mockAPI.onGet('/comments/1').reply(200, fakeReviews);
    mockAPI.onGet('/hotels/1/nearby').reply(200, fakeOffers);

    await store.dispatch(fetchOfferData(1));

    expect(store.getActions()).toEqual([
      getOfferPageStatusAction(DataStatus.IsLoading),
      getCurrentOfferByIdDataAction(fakeOffers[0]),
      getCurrentCityAction(fakeOffers[0].city),
      getSelectedPointAction(fakeOffers[0].location),
      getListOfReviewsAction(fakeReviews),
      getNearbyOffersAction(fakeOffers),
      getOfferPageStatusAction(DataStatus.IsLoaded),
    ]);
  });

  it('should dispatch fetchFavoriteList when GET /favorite', async () => {
    const store = mockStore();

    mockAPI.onGet('/favorite').reply(200, fakeOffers);

    await store.dispatch(fetchFavoriteList());

    expect(store.getActions()).toEqual([
      getFavoritesOffersStatusAction(DataStatus.IsLoading),
      getListOfFavoriteCardsAction(fakeOffers),
      getFavoritesOffersStatusAction(DataStatus.IsLoaded),
    ]);
  });

  it('should dispatch addComment when POST /comments:id', async () => {
    const store = mockStore();

    mockAPI
      .onPost('/comments/1', userCommentPost)
      .reply(200, userCommentResponse);

    await store.dispatch(addComment(userCommentPost, 1));

    expect(store.getActions()).toEqual([
      getSendedCommentStatusAction(DataStatus.IsSending),
      getListOfReviewsAction(filterReviewsList(userCommentResponse)),
      getSendedCommentStatusAction(DataStatus.IsSended),
    ]);
  });
});
