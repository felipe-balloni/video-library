import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: `${import.meta.env.VITE_STRAPI_API_URL}/graphql`,
    headers: {
        authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`
    },
    cache: new InMemoryCache()
});
