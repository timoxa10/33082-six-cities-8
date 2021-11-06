import { ReactNode } from 'react';
import SvgSpriteIcons from 'components/svg-sprite-icons/svg-sprite-icons';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <SvgSpriteIcons />
      {children}
    </>
  );
}

export default Layout;
