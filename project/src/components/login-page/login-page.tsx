import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthorizationStatus } from 'store/app-auth/selectors';
import { getOffers } from 'store/app-data/selectors';
import { useState, useCallback, SyntheticEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { loginAction } from 'store/api-actions';
import { AuthData } from 'types/auth-data';
import { AppRoute } from 'config/app-route';
import type { OffersProps } from 'types/card-props';
import type { CityCoordinates } from 'types/city-coordinates';
import { UserStatus } from 'config/user-status';
import { updateOffersListAction, redirectToRouteAction } from 'store/action';
import { getCurrentCityAction } from 'store/action';
import { filterOffersList } from 'utils/sorting-utils';
import { LOCATIONS_LIST } from 'config/locations-list';
import Logo from 'components/logo/logo';

interface LoginPageProps {
  city: string;
}

function LoginPage({ city }: LoginPageProps): JSX.Element {
  const history = useHistory();

  const offers = useSelector(getOffers);

  const authStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const onCitySelected = (value: CityCoordinates) => {
    dispatch(getCurrentCityAction(value));
  };

  const onUpdateCity = (value: string, array: OffersProps) => {
    dispatch(updateOffersListAction(filterOffersList(value, array)));

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
      onSubmit({
        login,
        password,
      });
    }
  }

  function handleUpdateCity(evt: MouseEvent<HTMLElement>) {
    evt.preventDefault();

    const cityCoords = LOCATIONS_LIST.find((item) => item.name === city);

    if (city && cityCoords) {
      onUpdateCity(city, offers);

      onCitySelected(cityCoords);
    }
  }

  if (authStatus === UserStatus.Auth) {
    history.push(AppRoute.Root);
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
                  style={
                    authStatus === UserStatus.Error
                      ? { borderColor: 'red' }
                      : { borderColor: '#e6e6e6' }
                  }
                  data-testid="email"
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
                  data-testid="password"
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

            {authStatus === UserStatus.Error && (
              <div className="locations__item locations--current ">
                <p className="locations__item-link">
                  Failed to login.
                  <br />
                  Please, enter a valid email.
                </p>
              </div>
            )}
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Root}
                onClick={(evt) => handleUpdateCity(evt)}
              >
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
