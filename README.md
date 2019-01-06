# Rails + Webpacker + React + Apollo + Hypernova SSR

Complete example for the blog post [Server Side Rendering for React + Apollo GraphQL Client](https://bessey.io/blog/2019/01/02/apollo-graphql-hypernova/).

On the Ruby side we have a Rails 5.2 app, with [Webpacker](https://github.com/rails/webpacker) installed, and customized to support [Hypernova](https://github.com/airbnb/hypernova). On the JS side, we have a couple React components, one using [Apollo GraphQL Client](https://github.com/apollographql/react-apollo).

### Setup

```sh
# install dependencies
bundle install
yarn install
# boot rails
./bin/rails server
# (optional) boot hypernova for SSR
yarn run hypernova
```

### Points of Interest
There's plenty of Rails + Webpacker boilerplate here, so here's some key places to look for implementation details:

- [./config/initializers/hypernova.rb](./config/initializers/hypernova.rb) - Hypernova configuration, including a Rails error logger on failure, which really helps when debugging!
- [./script/hypernova.js](./script/hypernova.js) - the Hypernova server script, to run in production for SSR, and optionally in development for testing SSR (though Hypernova will fall back to just client side rendering just fine)
- [./config/webpack/server.js](./config/webpack/server.js) - a new Webpacker environment for outputting Hypernova compatible JS.
- [./config/webpack/{development,production}.js](./config/webpack/development.js) - slightly changed from default scaffolding to _also_ build server.js
- [./app/javascript/packs/hypernova-server.js](./app/javascript/packs/hypernova-server.js) - the Hypernova server entry point, all SSR components must be registered in this (as well as application.js for client rendering too)
- [./app/javascript/hypernovaApolloRenderer.js](./app/javascript/hypernovaApolloRenderer.jsx) - customized component renderer, extending the [hypernova-react](https://github.com/airbnb/hypernova-react) package's source to also include [react-apollo](https://github.com/apollographql/react-apollo) data pre-fetching
- [./app/javascript/containers/withApollo.js](./app/javascript/containers/withApollo.js) - HOC providing to the client a self-rehydrating Apollo Client Provider
