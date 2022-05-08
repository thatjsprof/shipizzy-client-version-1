import React from "react";
import ReactDOM from "react-dom";
import App from "./App/Layout/App";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { resolvers, typeDefs } from "./Graphql/Resolvers/resolvers";

const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors) {
    console.log("graphQLErrors", graphQLErrors);
  }
  if (networkError) {
    console.log("networkError", networkError);
  }
});

// "https://shipizzy-server.herokuapp.com/graphql"
let uri = "http://localhost/graphql"

const httpLink = createHttpLink({
  uri,
});

const cache = new InMemoryCache();

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers,
});

client.writeData({
  data: {},
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
