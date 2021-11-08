import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import type { Actions } from 'types/action';
import { connect, ConnectedProps } from 'react-redux';
import { AppRoute } from 'config/AppRoute';
import type { State } from 'types/state';
import { getCurrentOfferIdAction } from 'store/action';
import CardOfferContainer from 'containers/card-offer-container/card-offer-container';
import browserHistory from 'browser-history/browser-history';
import MainPage from 'components/main-page/main-page';
import LoginPage from 'components/login-page/login-page';
import FavoritesPage from 'components/favorites-page/favorites-page';
import PrivateRoute from 'components/private-route/private-route';
import NotFoundPage from 'components/not-found-page/not-found-page';

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
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <MainPage />
        </Route>

        <Route
          path={AppRoute.Login}
          exact
          render={({ history }) => (
            <LoginPage onAuth={() => history.push(AppRoute.Root)} />
          )}
        />

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
        />

        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
export { App };
export default connector(App);
