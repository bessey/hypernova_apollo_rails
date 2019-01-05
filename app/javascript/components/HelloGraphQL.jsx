import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import withApollo from "../containers/withApollo";

const query = gql`
  query AllStarWarsFilms {
    allFilms {
      id
      title
    }
  }
`;

const HelloGraphQL = () => (
  <Query query={query}>
    {({ data, loading }) => {
      if (loading) return "Loading...";
      return data.allFilms.map(film => <p key={film.id}>{film.title}</p>);
    }}
  </Query>
);

export default withApollo(HelloGraphQL);
