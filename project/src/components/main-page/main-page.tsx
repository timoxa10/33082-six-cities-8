import { throttle } from 'throttle-debounce';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { LocationInfo } from 'types/location-info';
import { DataStatus } from 'config/data-status';
import { getCity, getOffersByCity } from 'store/app-data/selectors';
import { getOffersStatus } from 'store/app-data-status/selectors';
import Layout from 'components/layout/layout';
import TabsList from 'components/tabs-list/tabs-list';
import OfferPageForm from 'components/offer-sorting-form/offer-sorting-form';
import Card from 'components/card/card';
import CitiesMap from 'components/cities-map/cities-map';
import MainPageEmpty from 'components/main-page-empty/main-page-empty';
import { getSelectedPointAction } from 'store/action';
import Spinner from 'components/spinner/spinner';
import ErrorPage from 'components/error-page/error-page';

function MainPage(): JSX.Element {
  const loadingStatus = useSelector(getOffersStatus);
  const city = useSelector(getCity);
  const offersByCity = useSelector(getOffersByCity);

  const [hovered, setHovered] = useState(false);

  const dispatch = useDispatch();

  const onSelectedPoint = (point: LocationInfo) => {
    dispatch(getSelectedPointAction(point));
  };

  const onListItemHover = throttle(300, (location: LocationInfo) => {
    const currentCard = offersByCity.find(
      (point) => point.location === location,
    );

    if (currentCard) {
      onSelectedPoint(currentCard.location);
    }
    setHovered(true);
  });

  const onListItemLeave = () => {
    setHovered(false);
  };

  if (loadingStatus === DataStatus.IsLoading) {
    return <Spinner />;
  }

  if (loadingStatus === DataStatus.NotLoaded) {
    return <ErrorPage />;
  }

  if (loadingStatus === DataStatus.IsLoaded) {
    if (offersByCity.length === 0) {
      return <MainPageEmpty city={city.name} />;
    }

    return (
      <Layout className="page--gray page--main">
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <TabsList />
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offersByCity?.length} places to stay in {city?.name}
                </b>
                <OfferPageForm />
                <div className="cities__places-list places__list tabs__content">
                  {offersByCity?.map((card) => (
                    <Card
                      key={card.id}
                      card={card}
                      onListItemHover={onListItemHover}
                      onListItemLeave={onListItemLeave}
                      width={260}
                      height={200}
                      isCitiesCard
                    />
                  ))}
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <CitiesMap useOffersByCityPoints isHovered={hovered} />
                </section>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  if (loadingStatus === DataStatus.IsEmpty) {
    return <MainPageEmpty city={city.name} />;
  }

  return <Spinner />;
}

export default MainPage;
