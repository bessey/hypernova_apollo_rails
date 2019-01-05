// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import "@babel/polyfill"
import { renderReactWithApollo } from "../hypernovaApolloRenderer"
import HelloWorldComponent from "../components/HelloWorld"
import HelloGraphQLComponent from "../components/HelloGraphQL"

// Registers the components with Hypernova's renderer (doesn't actually render them)
export const HelloWorld = renderReactWithApollo("HelloWorld", HelloWorldComponent)
export const HelloGraphQL = renderReactWithApollo("HelloGraphQL", HelloGraphQLComponent)
