import Head from "next/head";

import Navigation from "./Navigation";

import { Container } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navigation />
      <Container pt={4}>{children}</Container>
    </div>
  );
};

export default Layout;
