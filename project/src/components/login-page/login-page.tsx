import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthorizationStatus } from 'store/app-auth/selectors';
import { getOffers } from 'store/app-data/selectors';
import { useState, useCallback, SyntheticEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { loginAction } from 'store/api-actions';
import { AuthData } from 'types/auth-data';
import { AppRoute } from 'config/AppRoute';
import type { OffersProps } from 'types/card-props';
import type { CityCoordinates } from 'types/city-coordinates';
import { UserStatus } from 'config/UserStatus';
import { updateOffersListAction, redirectToRouteAction } from 'store/action';
import { getCurrentCityAction } from 'store/action';
import { filterOffersList } from 'utils/sorting-utils';
import Logo from 'components/logo/logo';

interface LoginPageProps {
  onAuth: () => void;
}

function LoginPage({ onAuth }: LoginPageProps): JSX.Element {
  const offers = useSelector(getOffers);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();

  const onSubmit = (authData: AuthData, openMainRoot: () => void) => {
    dispatch(loginAction(authData));
    openMainRoot();
  };

  const onCitySelected = (value: CityCoordinates) => {
    dispatch(getCurrentCityAction(value));
  };

  const onUpdateCity = (city: string, array: OffersProps) => {
    dispatch(updateOffersListAction(filterOffersList(city, array)));

    dispatch(redirectToRouteAction(AppRoute.Root));
  };

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onLoginCallback = useCallback((evt) => {
    setLogin(evt.target.value);
  }, []);

  const onPasswordCallback = useCallback((evt) => {
    setPassword(evt.target.value);
  }, []);

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
                  onChange={onLoginCallback}
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
                  onChange={onPasswordCallback}
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

export default LoginPage;
