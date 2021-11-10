import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { LocationInfo } from 'types/location-info';
import type { OffersProps } from 'types/card-props';
import Layout from 'components/layout/layout';
import TabsList from 'components/tabs-list/tabs-list';
import OfferPageForm from 'components/offer-sorting-form/offer-sorting-form';
import Card from 'elements/card/card';
import CitiesMap from 'components/cities-map/cities-map';
import { getSelectedPointAction, updateOffersListAction } from 'store/action';
import { getCity, getOffersByCity, getOffers } from 'store/app-data/selectors';
import { filterOffersList } from 'utils/utils';

function MainPage(): JSX.Element {
  const city = useSelector(getCity);
  const offersByCity = useSelector(getOffersByCity);
  const offers = useSelector(getOffers);

  const dispatch = useDispatch();

  const onSelectedPoint = (point: LocationInfo) => {
    dispatch(getSelectedPointAction(point));
  };

  const onUpdateOffers = (value: string, array: OffersProps) => {
    dispatch(updateOffersListAction(filterOffersList(value, array)));
  };

  const amountByCity = filterOffersList(city.name, offers);

  if (amountByCity.length !== offersByCity.length) {
    onUpdateOffers(city.name, offers);
  }

  const [hovered, setHovered] = useState(false);

  const onListItemHover = (location: LocationInfo) => {
    const currentCard = offersByCity.find(
      (point) => point.location === location,
    );
    if (currentCard) {
      onSelectedPoint(currentCard.location);
    }
    setHovered(true);
  };

  const onListItemLeave = () => {
    setHovered(false);
  };

  return (
    <Layout className="page page--gray page--main">
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
                    className="cities__place-card"
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

export default MainPage;
