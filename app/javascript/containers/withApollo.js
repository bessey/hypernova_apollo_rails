import React from "react";
import T from "prop-types";
import { ApolloProvider } from "react-apollo";
import createApolloClient from "../createApolloClient";

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || "Unknown";
}

export default ComposedComponent => {
  return class WithApollo extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(
      ComposedComponent
    )})`;

    static propTypes = {
      apolloClient: T.object
    };

    constructor(props) {
      super(props);
      this.apollo =
        props.apolloClient ||
        createApolloClient((window && window.__APOLLO_STATE__) || {});
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
};
