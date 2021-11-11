import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'components/layout/layout';
import Card from 'elements/card/card';
import FavoritesPageEmpty from 'components/favorites-page-empty/favorites-page-empty';
import { getFavoriteCardsList } from 'store/app-data/selectors';
import { fetchFavoriteList } from 'store/api-actions';
import getOffersByCity from 'utils/getOffersByCity';

function FavoritesPage(): JSX.Element {
  const favoriteCardsList = useSelector(getFavoriteCardsList);

  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    dispatch(fetchFavoriteList());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const uniqueCities = [
    ...new Set(favoriteCardsList.map((card) => card.city.name)),
  ];

  if (favoriteCardsList.length === 0) {
    return <FavoritesPageEmpty />;
  }

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
                              favoritesClassName
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
}

export default FavoritesPage;
