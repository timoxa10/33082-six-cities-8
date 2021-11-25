import { useEffect, useCallback, useMemo, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DataStatus } from 'config/data-status';
import { AppRoute } from 'config/app-route';
import { LOCATIONS_LIST } from 'config/locations-list';
import type { CityCoordinates } from 'types/city-coordinates';
import type { OffersProps } from 'types/card-props';
import Layout from 'components/layout/layout';
import Card from 'components/card/card';
import Spinner from 'components/spinner/spinner';
import ErrorPage from 'components/error-page/error-page';
import FavoritesPageEmpty from 'components/favorites-page-empty/favorites-page-empty';
import { getFavoriteCardsList, getOffers } from 'store/app-data/selectors';
import { getFavoritesOffersStatus } from 'store/app-data-status/selectors';
import { fetchFavoriteList } from 'store/api-actions';
import { updateOffersListAction, redirectToRouteAction } from 'store/action';
import { getCurrentCityAction } from 'store/action';
import getOffersByCity from 'utils/getOffersByCity';
import { filterOffersList } from 'utils/sorting-utils';

function FavoritesPage(): JSX.Element {
  const favoriteCardsList = useSelector(getFavoriteCardsList);
  const loadingStatus = useSelector(getFavoritesOffersStatus);
  const offers = useSelector(getOffers);

  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    dispatch(fetchFavoriteList());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onCitySelected = useCallback(
    (value: CityCoordinates) => {
      dispatch(getCurrentCityAction(value));
    },
    [dispatch],
  );

  const onUpdateCity = useCallback(
    (value: string, array: OffersProps) => {
      dispatch(updateOffersListAction(filterOffersList(value, array)));

      dispatch(redirectToRouteAction(AppRoute.Root));
    },
    [dispatch],
  );

  const handleUpdateCity = useCallback(
    (evt: MouseEvent<HTMLElement>, value: string) => {
      evt.preventDefault();

      const cityCoords = LOCATIONS_LIST.find((item) => item.name === value);

      if (value && cityCoords) {
        onUpdateCity(value, offers);

        onCitySelected(cityCoords);
      }
    },
    [offers, onCitySelected, onUpdateCity],
  );

  const uniqueCities = useMemo(
    () => [...new Set(favoriteCardsList?.map((card) => card.city.name))],
    [favoriteCardsList],
  );

  const memoizedResult = useMemo(
    () =>
      [...uniqueCities].map(
        (city): JSX.Element => (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link
                  className="locations__item-link"
                  to={AppRoute.Root}
                  onClick={(evt) => handleUpdateCity(evt, city)}
                >
                  <span>{city}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {favoriteCardsList &&
                getOffersByCity(city, favoriteCardsList).map(
                  (cardByCity): JSX.Element => (
                    <Card
                      card={cardByCity}
                      key={cardByCity.id}
                      isFavoriteCard
                      width={150}
                      height={110}
                    />
                  ),
                )}
            </div>
          </li>
        ),
      ),
    [favoriteCardsList, handleUpdateCity, uniqueCities],
  );

  if (loadingStatus === DataStatus.IsLoading) {
    return <Spinner />;
  }

  if (loadingStatus === DataStatus.NotLoaded) {
    return <ErrorPage />;
  }

  if (loadingStatus === DataStatus.IsLoaded) {
    return (
      <Layout shouldRenderFooter>
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">{memoizedResult}</ul>
            </section>
          </div>
        </main>
      </Layout>
    );
  }

  if (loadingStatus === DataStatus.IsEmpty) {
    return <FavoritesPageEmpty />;
  }

  return <Spinner />;
}

export default FavoritesPage;
