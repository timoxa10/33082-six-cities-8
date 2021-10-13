import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from 'config/AppRoute';
import { UserStatus } from 'config/UserStatus';
import { CardProps } from 'elements/card/types';
import CardOffer from 'elements/card-offer/card-offer';
import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../not-found-page/not-found-page';

type AppProps = {
  availableApartments?: number;
  cardList: CardProps[];
};

function App({ availableApartments, cardList }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <MainPage
            availableApartments={availableApartments}
            cardList={cardList}
          />
        </Route>
        <Route exact path={AppRoute.Login} component={LoginPage} />
        <Route
          exact
          path={AppRoute.RoomOffer}
          render={({ match }) => {
            const { id } = match.params;
            const card = cardList.filter((item) => +item.id === +id);
            return <CardOffer {...card[0]} />;
          }}
        />
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <FavoritesPage cardList={cardList} />}
          authorizationStatus={UserStatus.Auth}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
