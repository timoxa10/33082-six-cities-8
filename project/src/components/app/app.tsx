import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import type { Actions } from 'types/action';
import { connect, ConnectedProps } from 'react-redux';
import { AppRoute } from 'config/AppRoute';
import { UserStatus } from 'config/UserStatus';
import type { State } from 'types/state';
import { getCurrentOfferIdAction } from 'store/action';
import CardOffer from 'elements/card-offer/card-offer';
import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../not-found-page/not-found-page';

const mapStateToProps = ({ offersByCity }: State) => ({
  offersByCity,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onCardOnClick(value: number) {
    dispatch(getCurrentOfferIdAction(value));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const { offersByCity, onCardOnClick } = props;

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
            onCardOnClick(Number(match.params.id));

            return <CardOffer />;
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
