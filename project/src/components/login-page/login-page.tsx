/* eslint-disable comma-dangle */
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useState, SyntheticEvent, MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from 'store/api-actions';
import { ThunkAppDispatch } from 'types/action';
import { AuthData } from 'types/auth-data';
import { AppRoute } from 'config/AppRoute';
import type { Actions } from 'types/action';
import type { State } from 'types/state';
import type { OffersProps } from 'types/card-props';
import type { CityCoordinates } from 'types/city-coordinates';
import { UserStatus } from 'config/UserStatus';
import {
  updateOffersListAction,
  redirectToRouteAction,
  getCurrentCityAction,
} from 'store/action';
import { filterOffersList } from 'utils/utils';
import Logo from 'elements/logo/logo';

interface LoginPageProps {
  onAuth: () => void;
}

const mapStateToProps = ({ authorizationStatus, offers }: State) => ({
  authorizationStatus,
  offers,
});

const mapDispatchToProps = (
  dispatch: Dispatch<Actions> & ThunkAppDispatch,
) => ({
  onSubmit(authData: AuthData, openMainRoot: () => void) {
    dispatch(loginAction(authData));
    openMainRoot();
  },

  onCitySelected(value: CityCoordinates) {
    dispatch(getCurrentCityAction(value));
  },

  onUpdateCity(city: string, offers: OffersProps) {
    dispatch(updateOffersListAction(filterOffersList(city, offers)));

    dispatch(redirectToRouteAction(AppRoute.Root));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & LoginPageProps;

function LoginPage({
  onSubmit,
  onAuth,
  authorizationStatus,
  onUpdateCity,
  offers,
  onCitySelected,
}: ConnectedComponentProps): JSX.Element {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(evt: SyntheticEvent) {
    evt.preventDefault();

    if (login !== '' && password !== '') {
      onSubmit(
        {
          login,
          password,
        },
        onAuth,
      );
    }
  }

  function handleUpdateCity(evt: MouseEvent<HTMLElement>) {
    evt.preventDefault();

    onUpdateCity('Amsterdam', offers);

    onCitySelected({
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    });
  }

  if (authorizationStatus === UserStatus.Auth) {
    return <Redirect to={AppRoute.Root} />;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  value={login}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={({ target }) => setLogin(target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  value={password}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <button
                disabled={login === '' || password === ''}
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Root}
                onClick={(evt) => handleUpdateCity(evt)}
              >
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { LoginPage };
export default connector(LoginPage);
