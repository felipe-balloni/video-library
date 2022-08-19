import { gql, useQuery } from '@apollo/client';

const GET_LESSONS_QUERY = gql`
    fragment FileParts on UploadFileEntityResponse {
        data {
            id
            attributes {
                alternativeText
                name
                height
                width
                url
                formats
            }
        }
    }
    query {
        lessons {
            data {
                id
                attributes {
                    title
                    slug
                    description
                    availableAt
                    type
                    challenge {
                        data {
                            id
                            attributes {
                                URL
                            }
                        }
                    }
                    teacher {
                        data {
                            id
                            attributes {
                                name
                                bio
                                avatar {
                                    ...FileParts
                                }
                            }
                        }
                    }
                    Video {
                        __typename
                        ... on ComponentVideoVideoFromLibrary {
                            id
                            title
                            media {
                                ...FileParts
                            }
                        }
                        ... on ComponentVideoVideoFromYouTube {
                            id
                            videoID
                        }
                        ... on ComponentVideoVideoFromVimeo {
                            id
                            videoID
                        }
                    }
                }
            }
        }
    }
`;

interface Lessons {
    data: [lesson];
}

interface lesson {
    id: string;
    attributes: {
        title: string;
    };
}

function App() {
    const { data } = useQuery<{ lessons: Lessons }>(GET_LESSONS_QUERY);

    return (
        <ul>
            {data?.lessons?.data.map(lesson => {
                return <li key={lesson.id}>{lesson.attributes.title}</li>;
            })}
        </ul>
    );
}

export default App;
