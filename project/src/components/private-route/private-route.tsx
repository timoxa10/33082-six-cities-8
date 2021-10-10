import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { AppRoute } from 'config/AppRoute';
import { UserStatus } from 'config/UserStatus';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
  authorizationStatus: UserStatus;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { exact, path, render, authorizationStatus } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        if (authorizationStatus === UserStatus.Auth) {
          return render();
        }
        return <Redirect to={AppRoute.Login} />;
      }}
    />
  );
}

export default PrivateRoute;
