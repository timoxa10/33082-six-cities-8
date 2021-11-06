/* eslint-disable no-console */
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { State } from 'types/state';
import { ThunkAppDispatch } from 'types/action';
import { logoutAction } from 'store/api-actions';
import { AppRoute } from 'config/AppRoute';
import { UserStatus } from 'config/UserStatus';
import Logo from 'elements/logo/logo';

const mapStateToProps = ({ authorizationStatus, login }: State) => ({
  authorizationStatus,
  login,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLogout() {
    dispatch(logoutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Header({
  authorizationStatus,
  login,
  onLogout,
}: PropsFromRedux): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={
                    authorizationStatus === UserStatus.Auth
                      ? AppRoute.Favorites
                      : AppRoute.Login
                  }
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">{login}</span>
                </Link>
              </li>
              <li className="header__nav-item" onClick={onLogout}>
                <Link
                  className="header__nav-link"
                  to={
                    authorizationStatus === UserStatus.Auth
                      ? AppRoute.Root
                      : AppRoute.Login
                  }
                >
                  <span className="header__signout">
                    {authorizationStatus === UserStatus.Auth
                      ? 'Sign out'
                      : 'Sign in'}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export { Header };
export default connector(Header);
