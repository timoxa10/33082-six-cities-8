import { Link } from 'react-router-dom';
import { AppRoute } from 'config/app-route';
import Layout from 'components/layout/layout';

function NotFoundPage(): JSX.Element {
  return (
    <Layout
      className="page--gray page--main page__main--index-empty"
      shouldRenderHeader={false}
    >
      <main className="page__main page__main--index">
        <div className="cities">
          <div
            className="
              cities__places-container cities__places-container--empty
              container"
          >
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <div className="cities__status-description">
                  <h1>
                    404.
                    <br />
                    Page not found.
                  </h1>
                  <br />
                  <Link to={AppRoute.Root}>
                    <button className="login__submit form__submit button">
                      Go to main page &#8594;
                    </button>
                  </Link>
                </div>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default NotFoundPage;
