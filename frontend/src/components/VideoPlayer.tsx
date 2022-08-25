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
import { getStrapiMedia } from '../lib/media';
import { Footer } from './Footer';
import { useGetLessonBySlugQuery } from '../graphql/generated';

interface VideoProps {
    lessonSlug: string;
}

export function VideoPlayer(props: VideoProps) {
    const { data } = useGetLessonBySlugQuery({
        variables: { slug: props.lessonSlug }
    });

    if (!data?.lessons?.data[0]) {
        return (
            <section className="flex-1">
                <div className="flex justify-center">
                    <p>Carregando...</p>
                </div>
            </section>
        );
    }

    const lesson = data.lessons.data[0];
    const teacher = lesson.attributes?.teacher?.data?.attributes;
    const video = lesson.attributes?.Video[0];

    const VideoFinal = () => {
        switch (video?.__typename) {
            case 'ComponentVideoVideoFromYouTube':
                return (
                    <Player>
                        <Youtube videoId={video.videoID ?? ''} />
                        <DefaultUi />
                    </Player>
                );
            case 'ComponentVideoVideoFromLibrary':
                const media = video.media?.data?.attributes?.url ?? '';
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
                        <Vimeo videoId={video.videoID ?? ''} />
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
                            {lesson.attributes?.title}
                        </h1>
                        <ReactMarkdown
                            className="mt-4 text-gray-200 leading-relaxed"
                            remarkPlugins={[emoji, breaks, gfm]}
                        >
                            {lesson.attributes?.description ?? ''}
                        </ReactMarkdown>
                        {teacher && (
                            <div className="flex items-center gap-4 mt-6">
                                <img
                                    className="h-16 w-16 object-cover rounded-full border-2 border-blue-500"
                                    src={getStrapiMedia(
                                        teacher.avatar?.data?.attributes?.url ??
                                            ''
                                    )}
                                    alt=""
                                />
                                <div className="leading-relaxed">
                                    <strong className="font-bold text-2xl block">
                                        {teacher.name}
                                    </strong>
                                    <span className="text-sm text-gray-200 block">
                                        {teacher.bio}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-4">
                        <a
                            href="#"
                            className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors duration-150"
                        >
                            <ChatBubbleLeftRightIcon className="h-6 w-auto" />
                            Comunidade do Discord
                        </a>
                        {lesson?.attributes?.challenge?.data?.attributes
                            ?.URL && (
                            <a
                                href={
                                    lesson.attributes.challenge.data.attributes
                                        .URL
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
                {/*TODO: Add global content to make dynamic this component*/}
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
