import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { getAuthorizationStatus } from 'store/app-auth/selectors';
import { AppRoute } from 'config/AppRoute';
import { UserStatus } from 'config/UserStatus';

type PrivateRouteProps = RouteProps & {
  component: () => JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { exact, path, component: Component } = props;

  const history = useHistory();

  const authStatus = useSelector(getAuthorizationStatus);

  if (authStatus === UserStatus.NoAuth) {
    history.push(AppRoute.Login);
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        if (authStatus === UserStatus.Auth) {
          return Component && <Component {...props} />;
        }
      }}
    />
  );
}
export default PrivateRoute;
