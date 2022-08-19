import {ApolloClient, InMemoryCache} from "@apollo/client";

const token = import.meta.env.VITE_AUTH_TOKEN;

export const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    headers: {
        authorization: `Bearer ${token}`
    },
    cache: new InMemoryCache(),
});
