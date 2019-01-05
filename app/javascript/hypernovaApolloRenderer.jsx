import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import hypernova, { serialize, load } from "hypernova";

import { getDataFromTree } from "react-apollo";
import createApolloClient from "./createApolloClient";

export const renderReactWithApollo = (name, Component) =>
  hypernova({
    server() {
      return async props => {
        const client = createApolloClient();
        await getDataFromTree(<Component {...props} apolloClient={client} />);

        const ComponentWithCache = buildApolloClientCacheComponent(
          Component,
          client.extract()
        );
        const element = React.createElement(ComponentWithCache, {
          ...props,
          apolloClient: client
        });
        const html = ReactDOMServer.renderToString(element);
        return serialize(name, html, props);
      };
    },

    client() {
      const payloads = load(name);
      if (payloads) {
        payloads.forEach(payload => {
          const { node, data } = payload;
          if (node) {
            const element = React.createElement(Component, data);
            if (ReactDOM.hydrate) {
              ReactDOM.hydrate(element, node);
            } else {
              ReactDOM.render(element, node);
            }
          }
        });
      }

      return Component;
    }
  });

export const renderReactWithApolloStatic = (name, Component) =>
  hypernova({
    server() {
      return async props => {
        const client = createApolloClient();
        await getDataFromTree(<Component {...props} apolloClient={client} />);

        const ComponentWithCache = buildApolloClientCacheComponent(
          Component,
          client.extract()
        );

        const element = React.createElement(ComponentWithCache, {
          ...props,
          apolloClient: client
        });
        return ReactDOMServer.renderToStaticMarkup(element);
      };
    },

    client() {}
  });

function buildApolloClientCacheComponent(Component, clientCache) {
  const ComponentWithCache = props => (
    <Fragment>
      {/*
        Store Apollo Client state, per
        https://www.apollographql.com/docs/react/features/server-side-rendering.html#getDataFromTree
        then delete ourself because React will warn it wasn't expecting a script tag.
        Deletion doesn't work in IE, but the only harm done is generating that React warning.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(
            clientCache
          ).replace(/</g, "\\u003c")};
          document.currentScript && document.currentScript.remove();
          `
        }}
      />
      <Component {...props} />
    </Fragment>
  );
  return ComponentWithCache;
}
