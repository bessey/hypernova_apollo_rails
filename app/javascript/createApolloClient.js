import ApolloClient from "apollo-boost";
import {InMemoryCache} from "apollo-cache-inmemory";
import fetch from "isomorphic-fetch"

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

export default function createApolloClient(initialState = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared across requests, causing stale data
  if (!process.browser) {
    return createNewApolloClient(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createNewApolloClient(initialState)
  }

  return apolloClient
}

function createNewApolloClient(initialState) {
  return new ApolloClient({
    uri: "https://api.graphcms.com/simple/v1/swapi",
    cache: new InMemoryCache({}).restore(initialState)
  });
}
