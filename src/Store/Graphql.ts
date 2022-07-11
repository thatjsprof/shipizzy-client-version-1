export const graphqlAPI = (query: any, variables: any) =>
  fetch("/graphql", {
    method: "POST",
    body: JSON.stringify({ query, variables }),
  });
