import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AppRoute } from 'config/app-route';
import { getCurrentOfferIdAction } from 'store/action';
import CardOfferContainer from 'containers/card-offer-container/card-offer-container';
import MainPage from 'components/main-page/main-page';
import LoginPage from 'components/login-page/login-page';
import FavoritesPage from 'components/favorites-page/favorites-page';
import PrivateRoute from 'components/private-route/private-route';
import NotFoundPage from 'components/not-found-page/not-found-page';

function App(): JSX.Element {
  const dispatch = useDispatch();

  const setActiveCardId = (value: number) => {
    dispatch(getCurrentOfferIdAction(value));
  };

  return (
    <Switch>
      <Route exact path={AppRoute.Root}>
        <MainPage />
      </Route>

      <Route exact path={AppRoute.Login}>
        <LoginPage city="Hamburg" />
      </Route>

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
        component={() => <FavoritesPage />}
      />

      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default App;
