import type { OffersProps } from 'types/card-props';
import Logo from 'elements/logo/logo';
import Header from 'components/header/header';
import HiddenBookmarkContent from 'components/hidden-bookmark-content/hidden-bookmark-content';
import CardFavorite from 'elements/card-favorite/card-favorite';

interface FavoritesPageProps {
  cardList: OffersProps;
}

function FavoritesPage({ cardList }: FavoritesPageProps): JSX.Element {
  return (
    <>
      <HiddenBookmarkContent />
      <div className="page">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Amsterdam</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cardList?.map((card) => (
                      <CardFavorite {...card} key={card.id} />
                    ))}
                  </div>
                </li>
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Cologne</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cardList?.map((card) => (
                      <CardFavorite {...card} key={card.id} />
                    ))}
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <Logo />
        </footer>
      </div>
    </>
  );
}

export default FavoritesPage;
