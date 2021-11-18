import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from 'services/api';
import { checkAuthAction } from 'store/api-actions';
import { AppRoute } from 'config/AppRoute';
import { UserStatus } from 'config/UserStatus';
import { State } from 'types/state';
import { requireAuthorizationAction, setLoginAction } from 'store/action';
import { setAvatarUrlAction } from 'store/action';

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
});
