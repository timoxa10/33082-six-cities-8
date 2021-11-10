import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getIsLoading, getIsError } from 'store/app-data/selectors';
import Logo from 'elements/logo/logo';
import SvgSpriteIcons from 'components/svg-sprite-icons/svg-sprite-icons';
import Header from 'components/header/header';
import Spinner from 'elements/spinner/spinner';
import ErrorPage from 'components/error-page/error-page';

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  className: string;
  shouldRenderFooter?: boolean;
}

function Layout({
  children,
  className,
  shouldRenderFooter = false,
}: LayoutProps): JSX.Element {
  const isLoading = useSelector(getIsLoading);
  const isError = useSelector(getIsError);

  return (
    <>
      {isLoading && <Spinner />}

      {isError && <ErrorPage />}

      {!isLoading && !isError && (
        <>
          <div className={classNames(className)}>
            <SvgSpriteIcons />
            <Header />
            {children}
          </div>
          {shouldRenderFooter && (
            <footer className="footer container">
              <Logo />
            </footer>
          )}
        </>
      )}
    </>
  );
}
export default Layout;
