import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from 'config/AppRoute';
import { UserStatus } from 'config/UserStatus';
import type { CardListProps } from 'types/card-list-props';
import CardOffer from 'elements/card-offer/card-offer';
import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../not-found-page/not-found-page';

type AppProps = {
  availableApartments?: number;
  cardList: CardListProps[];
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

            const card = cardList.find((item) => +item.id === +id);

            if (card) {
              return (
                <CardOffer card={card} cardList={cardList} currentOffer={+id} />
              );
            }
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
