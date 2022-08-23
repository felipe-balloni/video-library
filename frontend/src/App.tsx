// import { gql, useQuery } from '@apollo/client';

// const GET_LESSONS_QUERY = gql`
//     fragment FileParts on UploadFileEntityResponse {
//         data {
//             id
//             attributes {
//                 alternativeText
//                 name
//                 height
//                 width
//                 url
//                 formats
//             }
//         }
//     }
//     query GetLessons {
//         lessons {
//             data {
//                 id
//                 attributes {
//                     title
//                     slug
//                     description
//                     availableAt
//                     type
//                     challenge {
//                         data {
//                             id
//                             attributes {
//                                 URL
//                             }
//                         }
//                     }
//                     teacher {
//                         data {
//                             id
//                             attributes {
//                                 name
//                                 bio
//                                 avatar {
//                                     ...FileParts
//                                 }
//                             }
//                         }
//                     }
//                     Video {
//                         __typename
//                         ... on ComponentVideoVideoFromLibrary {
//                             id
//                             title
//                             media {
//                                 ...FileParts
//                             }
//                         }
//                         ... on ComponentVideoVideoFromYouTube {
//                             id
//                             videoID
//                         }
//                         ... on ComponentVideoVideoFromVimeo {
//                             id
//                             videoID
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `;
//
// interface Lessons {
//     data: [lesson];
// }
//
// interface lesson {
//     id: string;
//     attributes: {
//         title: string;
//     };
// }

import { Router } from './Router';
import { client } from './lib/apollo';
import { ApolloProvider } from '@apollo/client';

export function App() {
    // const { data } = useQuery<{ lessons: Lessons }>(GET_LESSONS_QUERY);

    return (
        <ApolloProvider client={client}>
            <Router />
        </ApolloProvider>
    );
}
