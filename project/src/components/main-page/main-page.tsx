import { Dispatch } from 'redux';
import type { Actions } from 'types/action';
import { connect, ConnectedProps } from 'react-redux';
import type { LocationInfo } from 'types/location-info';
import type { State } from 'types/state';
import Header from 'components/header/header';
import SvgSpriteIcons from 'components/svg-sprite-icons/svg-sprite-icons';
import TabsList from 'components/tabs-list/tabs-list';
import OfferPageForm from 'components/offer-sorting-form/offer-sorting-form';
import Card from 'elements/card/card';
import CitiesMap from 'components/cities-map/cities-map';
import Spinner from 'elements/spinner/spinner';
import { getSelectedPointAction } from 'store/action';

const mapStateToProps = ({
  city,
  offersByCity,
  isLoading,
  selectedPoint,
}: State) => ({
  city,
  offersByCity,
  isLoading,
  selectedPoint,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onSelectedPoint(point: LocationInfo) {
    dispatch(getSelectedPointAction(point));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MainPage(props: PropsFromRedux): JSX.Element {
  const { isLoading, city, offersByCity, selectedPoint, onSelectedPoint } =
    props;

  const onListItemHover = (location: LocationInfo) => {
    const currentCard = offersByCity.find(
      (point) => point.location === location,
    );
    if (currentCard) {
      onSelectedPoint(currentCard.location);
    }
  };

  return (
    <>
      <SvgSpriteIcons />
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>

          {isLoading && <Spinner />}

          {!isLoading && (
            <>
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
            </>
          )}
        </main>
      </div>
    </>
  );
}

export { MainPage };
export default connector(MainPage);
