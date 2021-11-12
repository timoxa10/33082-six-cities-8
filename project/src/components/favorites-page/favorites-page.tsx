/* eslint-disable no-console */
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataStatus } from 'config/DataStatus';
import Layout from 'components/layout/layout';
import Card from 'components/card/card';
import Spinner from 'components/spinner/spinner';
import ErrorPage from 'components/error-page/error-page';
import FavoritesPageEmpty from 'components/favorites-page-empty/favorites-page-empty';
import { getFavoriteCardsList } from 'store/app-data/selectors';
import { getFavoritesOffersStatus } from 'store/app-data-status/selectors';
import { fetchFavoriteList } from 'store/api-actions';
import getOffersByCity from 'utils/getOffersByCity';

function FavoritesPage(): JSX.Element {
  const favoriteCardsList = useSelector(getFavoriteCardsList);
  const loadingStatus = useSelector(getFavoritesOffersStatus);

  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    dispatch(fetchFavoriteList());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const uniqueCities = [
    ...new Set(favoriteCardsList?.map((card) => card.city.name)),
  ];

  console.log(loadingStatus);

  switch (loadingStatus) {
    case DataStatus.IsLoading:
      return <Spinner />;
    case DataStatus.NotLoaded:
      return <ErrorPage />;
    case DataStatus.IsLoaded:
      return (
        <Layout className="page" shouldRenderFooter>
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {[...uniqueCities].map(
                    (city): JSX.Element => (
                      <li className="favorites__locations-items" key={city}>
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" href="/">
                              <span>{city}</span>
                            </a>
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
                                  className="favorites__card"
                                  width={150}
                                  height={110}
                                />
                              ),
                            )}
                        </div>
                      </li>
                    ),
                  )}
                </ul>
              </section>
            </div>
          </main>
        </Layout>
      );
    case DataStatus.IsEmpty:
      return <FavoritesPageEmpty />;
    default:
      break;
  }

  return <Spinner />;
}

export default FavoritesPage;
