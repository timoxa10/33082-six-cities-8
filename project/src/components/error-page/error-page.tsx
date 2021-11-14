import Layout from 'components/layout/layout';

function ErrorPage(): JSX.Element {
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
                <p className="cities__status-description">
                  Something went wrong.
                  <br />
                  Please try to reload the page.
                  <br />
                  <br />
                  <button
                    className="login__submit form__submit button"
                    onClick={() => window.location.reload()}
                  >
                    Click to reload &#8594;
                  </button>
                </p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default ErrorPage;
