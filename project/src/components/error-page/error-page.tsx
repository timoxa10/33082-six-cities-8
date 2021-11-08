import { Link } from 'react-router-dom';
import { AppRoute } from 'config/AppRoute';

function ErrorPage(): JSX.Element {
  return (
    <>
      <h1>
        Something went wrong.
        <br />
      </h1>
      <Link to={AppRoute.Root}>Go to main page -&gt;</Link>
    </>
  );
}

export default ErrorPage;
