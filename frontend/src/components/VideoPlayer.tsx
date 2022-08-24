import {
    BoltIcon,
    ChatBubbleLeftRightIcon,
    ChevronRightIcon,
    DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import '@vime/core/themes/default.css';
import { DefaultUi, Player, Video, Vimeo, Youtube } from '@vime/react';
import ReactMarkdown from 'react-markdown';
import emoji from 'remark-emoji';
import breaks from 'remark-breaks';
import gfm from 'remark-gfm';
import { gql, useQuery } from '@apollo/client';
import { getStrapiMedia } from '../lib/media';
import { Footer } from './Footer';

const GET_LESSON_BY_SLUG = gql`
    fragment FileParts on UploadFileEntityResponse {
        data {
            id
            attributes {
                name
                alternativeText
                caption
                width
                height
                url
            }
        }
    }
    query GetLesson($slug: String) {
        lessons(filters: { slug: { eq: $slug } }) {
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
                        ... on ComponentVideoVideoFromYouTube {
                            id
                            videoID
                        }
                        ... on ComponentVideoVideoFromLibrary {
                            id
                            title
                            media {
                                ...FileParts
                            }
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

interface FileParts {
    data: {
        id: number;
        attributes: {
            name: string;
            alternativeText: string;
            caption: string;
            width: number;
            height: number;
            url: string;
        };
    };
}

interface Teacher {
    data: {
        id: number;
        attributes: {
            name: string;
            bio: string;
            avatar?: FileParts;
        };
    };
}

interface Challenge {
    data: {
        id: number;
        attributes: {
            URL: string;
        };
    };
}

interface GetLessonsResponse {
    lessons: {
        data: [
            {
                id: number;
                attributes: {
                    title: string;
                    slug: string;
                    description: string;
                    availableAt: Date;
                    type: 'Live' | 'Hands-on';
                    challenge?: Challenge;
                    teacher?: Teacher;
                    Video: [
                        {
                            __typename:
                                | 'ComponentVideoVideoFromYouTube'
                                | 'ComponentVideoVideoFromLibrary'
                                | 'ComponentVideoVideoFromVimeo';
                            id: number;
                            title?: string;
                            media?: FileParts;
                            videoID?: string | null;
                        }
                    ];
                };
            }
        ];
    };
}

interface VideoProps {
    lessonSlug: string;
}

export function VideoPlayer(props: VideoProps) {
    const { data } = useQuery<GetLessonsResponse>(GET_LESSON_BY_SLUG, {
        variables: {
            slug: props.lessonSlug
        }
    });

    const lesson = data?.lessons.data[0];

    const VideoFinal = () => {
        switch (lesson?.attributes.Video[0].__typename) {
            case 'ComponentVideoVideoFromYouTube':
                return (
                    <Player>
                        <Youtube
                            videoId={lesson.attributes.Video[0].videoID ?? ''}
                        />
                        <DefaultUi />
                    </Player>
                );
            case 'ComponentVideoVideoFromLibrary':
                const media =
                    lesson.attributes.Video[0].media?.data.attributes?.url ??
                    '';
                return (
                    { media } && (
                        <Player>
                            <Video crossOrigin="">
                                <source
                                    src={getStrapiMedia(media)}
                                    type="video/mp4"
                                />
                            </Video>
                            <DefaultUi />
                        </Player>
                    )
                );
            case 'ComponentVideoVideoFromVimeo':
                return (
                    <Player>
                        <Vimeo
                            videoId={lesson.attributes.Video[0].videoID ?? ''}
                        />
                        <DefaultUi />
                    </Player>
                );
            default:
                return (
                    <div className="flex-1 items-center justify-center text-3xl text-gray-300">
                        Sem video neste conteúdo
                    </div>
                );
        }
    };

    return (
        <section className="flex-1">
            <div className="flex justify-center">
                <div className="h-full w-full max-w-screen-xl max-h-[60vh] aspect-video bg-green-300 rounded">
                    <VideoFinal />
                </div>
            </div>

            <article className="p-8 max-w-screen-xl mx-auto">
                <header className="flex items-start gap-16">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">
                            {lesson?.attributes.title}
                        </h1>
                        <ReactMarkdown
                            className="mt-4 text-gray-200 leading-relaxed"
                            remarkPlugins={[emoji, breaks, gfm]}
                        >
                            {lesson?.attributes.description ?? ''}
                        </ReactMarkdown>
                        <div className="flex items-center gap-4 mt-6">
                            <img
                                className="h-16 w-auto rounded-full border-2 border-blue-500"
                                src="https://github.com/felipe-balloni.png"
                                alt=""
                            />
                            <div className="leading-relaxed">
                                <strong className="font-bold text-2xl block">
                                    {
                                        lesson?.attributes.teacher?.data
                                            .attributes.name
                                    }
                                </strong>
                                <span className="text-sm text-gray-200 block">
                                    {
                                        lesson?.attributes.teacher?.data
                                            .attributes.bio
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <a
                            href="#"
                            className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors duration-150"
                        >
                            <ChatBubbleLeftRightIcon className="h-6 w-auto" />
                            Comunidade do Discord
                        </a>
                        {lesson?.attributes.challenge?.data?.attributes.URL && (
                            <a
                                href={
                                    lesson?.attributes.challenge?.data
                                        ?.attributes.URL
                                }
                                target="_blank"
                                className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors duration-150"
                            >
                                <BoltIcon className="h-6 w-auto" />
                                Acesse o desafio
                            </a>
                        )}
                    </div>
                </header>
                <div className="gap-8 mt-20 grid grid-cols-2">
                    <a
                        href="#"
                        target="_blank"
                        className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors duration-150"
                    >
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <DocumentArrowDownIcon className="h-10 w-auto" />
                        </div>
                        <div className="p-6 leading-relaxed">
                            <strong className="text-2xl">
                                Material complementar
                            </strong>
                            <p className="text-sm text-gray-200 mt-2">
                                Acesse o material complementar para acelerar o
                                seu desenvolvimento
                            </p>
                        </div>
                        <div className="h-full p-6 flex items-center">
                            <ChevronRightIcon className="h-6 w-auto text-blue-500" />
                        </div>
                    </a>
                    <a
                        href="#"
                        className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors duration-150"
                    >
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <DocumentArrowDownIcon className="h-10 w-auto" />
                        </div>
                        <div className="p-6 leading-relaxed">
                            <strong className="text-2xl">
                                Wallpapers exclusivos
                            </strong>
                            <p className="text-sm text-gray-200 mt-2">
                                Baixe wallpapers exclusivos do Ignite Lab e
                                personalize a sua máquina
                            </p>
                        </div>
                        <div className="h-full p-6 flex items-center">
                            <ChevronRightIcon className="h-6 w-auto text-blue-500" />
                        </div>
                    </a>
                </div>
                <Footer />
            </article>
        </section>
    );
}
