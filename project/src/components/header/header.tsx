import { AppRoute } from 'config/app-route';
import { UserStatus } from 'config/user-status';
import Logo from 'components/logo/logo';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from 'store/api-actions';
import { getAuthorizationStatus, getAvatarUrl } from 'store/app-auth/selectors';
import { getLogin } from 'store/app-auth/selectors';

function Header(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const login = useSelector(getLogin);
  const avatarUrl = useSelector(getAvatarUrl);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutAction());
  };

  const isAuth = authorizationStatus === UserStatus.Auth;

  return (
    <header className="header" data-testid="header">
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
                  to={isAuth ? AppRoute.Favorites : AppRoute.Login}
                >
                  <div
                    className="header__avatar-wrapper user__avatar-wrapper"
                    style={{
                      backgroundImage: isAuth
                        ? `url(${avatarUrl})`
                        : 'url(../img/avatar.svg)',
                    }}
                  />
                  <span className="header__user-name user__name">{login}</span>
                </Link>
              </li>
              <li className="header__nav-item" onClick={onLogout}>
                <Link
                  className="header__nav-link"
                  to={isAuth ? AppRoute.Root : AppRoute.Login}
                >
                  <span className="header__signout">
                    {isAuth ? 'Sign out' : 'Sign in'}
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

export default Header;
