import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { AppRoute } from 'config/AppRoute';
import { UserStatus } from 'config/UserStatus';

type PrivateRouteProps = RouteProps & {
  authorizationStatus: UserStatus;
  component: () => JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { exact, path, component: Component, authorizationStatus } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        if (authorizationStatus === UserStatus.Auth) {
          return Component && <Component {...props} />;
        }
        return <Redirect to={AppRoute.Login} />;
      }}
    />
  );
}

export default PrivateRoute;
