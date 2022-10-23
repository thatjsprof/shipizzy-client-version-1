import React from "react";
import ReactDOM from "react-dom";
import store from "./Store/Store";
import App from "./App/Layout/App";
import { Provider } from "react-redux";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import { createHttpLink } from "apollo-link-http";
import AuthProvider from "Providers/AuthProvider";
import { InMemoryCache } from "apollo-cache-inmemory";

const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors) {
    console.log("graphQLErrors", graphQLErrors);
  }
  if (networkError) {
    console.log("networkError", networkError);
  }
});

// "https://localhost/graphql"
// "https://shipizzy-server.herokuapp.com/graphql"
let uri = "https://shipizzy-server.herokuapp.com/graphql";

const httpLink = createHttpLink({
  uri,
});

const cache = new InMemoryCache();

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
