import React from 'react';
import Navbar from './components/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Navbar/>
      <main className="content">{children}</main>

    </div>
  );
}

export default Layout;