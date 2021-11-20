import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { redirect } from 'store/redirect';
import { redirectToRouteAction } from 'store/action';
import { AppRoute } from 'config/app-route';
import { State } from 'types/state';

const fakeHistory = {
  location: { pathname: '' },
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('browser-history/browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectToRouteAction(AppRoute.Login));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toEqual([redirectToRouteAction(AppRoute.Login)]);
  });

  it('should not to be redirect /main-page because bad action', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION', payload: AppRoute.Root });
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Root);
  });
});
