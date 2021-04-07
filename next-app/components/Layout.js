import Head from "next/head";

import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navigation />
      <div pt={4}>{children}</div>
    </div>
  );
};

export default Layout;
