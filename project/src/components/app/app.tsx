/* eslint-disable no-console */
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import type { Actions } from 'types/action';
import { connect, ConnectedProps } from 'react-redux';
import { AppRoute } from 'config/AppRoute';
import { UserStatus } from 'config/UserStatus';
import type { State } from 'types/state';
import { getCurrentOfferIdAction } from 'store/action';
import CardOfferContainer from 'containers/card-offer-container/card-offer-container';
import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../not-found-page/not-found-page';

const mapStateToProps = ({ offersByCity }: State) => ({
  offersByCity,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  setActiveCardId(value: number) {
    dispatch(getCurrentOfferIdAction(value));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const { offersByCity, setActiveCardId } = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <MainPage />
        </Route>
        <Route exact path={AppRoute.Login} component={LoginPage} />
        <Route
          exact
          path={AppRoute.RoomOffer}
          render={({ match }) => {
            setActiveCardId(Number(match.params.id));

            return <CardOfferContainer />;
          }}
        />
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          component={() => <FavoritesPage cardList={offersByCity} />}
          authorizationStatus={UserStatus.Auth}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
export { App };
export default connector(App);
