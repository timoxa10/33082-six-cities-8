import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../not-found-page/not-found-page';
import Card from '../card/card';

type AppProps = {
  availableApartments: number;
};

function App({ availableApartments }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <MainPage availableApartments={availableApartments} />
        </Route>
        <Route exact path={AppRoute.Login}>
          <LoginPage />
        </Route>
        <Route path="/offer/:id" exact component={Card} />
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <FavoritesPage />}
          authorizationStatus={AuthorizationStatus.Auth}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
