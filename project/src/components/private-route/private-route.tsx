import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { getAuthorizationStatus } from 'store/app-auth/selectors';
import { AppRoute } from 'config/AppRoute';
import { UserStatus } from 'config/UserStatus';

type PrivateRouteProps = RouteProps & {
  component: () => JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { exact, path, component: Component } = props;

  const authorizationStatus = useSelector(getAuthorizationStatus);

  if (authorizationStatus === UserStatus.NoAuth) {
    return <Redirect to={AppRoute.Login} />;
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        if (authorizationStatus === UserStatus.Auth) {
          return Component && <Component {...props} />;
        }
      }}
    />
  );
}
export default PrivateRoute;
