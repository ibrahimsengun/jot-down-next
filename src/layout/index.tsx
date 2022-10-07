import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <Header /> <>{children}</> <Footer />
    </>
  );
};

export default Layout;
