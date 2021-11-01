import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import type { LocationInfo } from 'types/location-info';
import type { State } from 'types/state';
import Header from 'components/header/header';
import HiddenBookmarkContent from 'components/hidden-bookmark-content/hidden-bookmark-content';
import TabsList from 'components/tabs-list/tabs-list';
import OfferPageForm from 'components/offer-sorting-form/offer-sorting-form';
import Card from 'elements/card/card';
import CitiesMap from '../cities-map/cities-map';

const connector = connect(
  ({ city, offersByCity }: State) => ({
    city,
    offersByCity,
  }),
  {},
);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MainPage(props: PropsFromRedux): JSX.Element {
  const { city, offersByCity } = props;

  const [selectedPoint, setSelectedPoint] = useState<LocationInfo | undefined>(
    undefined,
  );

  const onListItemHover = (location: LocationInfo) => {
    const currentCard = offersByCity.find(
      (point) => point.location === location,
    );
    if (currentCard) {
      setSelectedPoint(currentCard.location);
    }
  };

  return (
    <>
      <HiddenBookmarkContent />
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <TabsList />
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offersByCity.length} places to stay in {city.name}
                </b>
                <OfferPageForm />
                <div className="cities__places-list places__list tabs__content">
                  {offersByCity?.map((card) => (
                    <Card
                      key={card.id}
                      card={card}
                      onListItemHover={onListItemHover}
                      className="cities__place-card"
                    />
                  ))}
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <CitiesMap
                    city={city}
                    points={offersByCity.map(({ location }) => location)}
                    selectedPoint={selectedPoint}
                  />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export { MainPage };
export default connector(MainPage);
