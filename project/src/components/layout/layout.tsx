import classNames from 'classnames';
import Logo from 'components/logo/logo';
import SvgSpriteIcons from 'components/svg-sprite-icons/svg-sprite-icons';
import Header from 'components/header/header';

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  className: string;
  shouldRenderFooter?: boolean;
  shouldRenderHeader?: boolean;
}

function Layout({
  children,
  className,
  shouldRenderFooter = false,
  shouldRenderHeader = true,
}: LayoutProps): JSX.Element {
  return (
    <>
      <div className={classNames([className])}>
        <SvgSpriteIcons />
        {shouldRenderHeader && <Header />}
        {children}
      </div>
      {shouldRenderFooter && (
        <footer className="footer container">
          <Logo />
        </footer>
      )}
    </>
  );
}
export default Layout;
