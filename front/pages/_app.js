import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import fetch from "isomorphic-unfetch";
import React from "react";

const IS_BROWSER = !!process.browser;

if (!IS_BROWSER) {
  global.fetch = fetch;
}

const URI_ENDPOINT = "http://localhost:3001/graphql";

const initialState = {};
const client = new ApolloClient({
  connectToDevTools: IS_BROWSER,
  ssrMode: !IS_BROWSER, // Disables forceFetch on the server (so queries are only run once)
  link: new HttpLink({
    uri: URI_ENDPOINT, // Server URL (must be absolute)
    credentials: "same-origin" // Additional fetch() options like `credentials` or `headers`
  }),
  cache: new InMemoryCache().restore(initialState)
});

const MyApp = props => {
  const { Component, pageProps } = props;

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
