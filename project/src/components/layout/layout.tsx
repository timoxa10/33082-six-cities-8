import classNames from 'classnames';
import type { State } from 'types/state';
import { connect, ConnectedProps } from 'react-redux';
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

const connector = connect(({ isLoading, isError }: State) => ({
  isLoading,
  isError,
}));

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & LayoutProps;

function Layout({
  children,
  isLoading,
  isError,
  className,
  shouldRenderFooter = false,
}: ConnectedComponentProps): JSX.Element {
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
export { Layout };
export default connector(Layout);
