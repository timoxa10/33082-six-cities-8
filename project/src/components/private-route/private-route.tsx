import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import { AppRoute } from 'config/AppRoute';
import { UserStatus } from 'config/UserStatus';

type PrivateRouteProps = RouteProps & {
  authorizationStatus: UserStatus;
  component: () => JSX.Element;
};

const mapStateToProps = ({ authorizationStatus }: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
  const { exact, path, component: Component, authorizationStatus } = props;

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

export { PrivateRoute };
export default connector(PrivateRoute);
