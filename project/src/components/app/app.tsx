/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AppRoute } from 'config/AppRoute';
import { UserStatus } from 'config/UserStatus';
import type { State } from 'types/state';
import CardOffer from 'elements/card-offer/card-offer';
import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../not-found-page/not-found-page';

const connector = connect(
  ({ offersByCity, city }: State) => ({
    offersByCity,
    city,
  }),
  {},
);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const { offersByCity } = props;

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
            const id = Number(match.params.id);

            const card = offersByCity.find((item) => item.id === id);

            if (card) {
              return (
                <CardOffer
                  card={card}
                  cardList={offersByCity}
                  currentOffer={id}
                />
              );
            }
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
