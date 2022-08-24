import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { VideoPlayer } from '../components/VideoPlayer';
import { useParams } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { ArrowCircleRightIcon } from '@heroicons/react/solid';

export function Event() {
    const { slug } = useParams<{ slug: string }>();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-1">
                {slug ? (
                    <VideoPlayer lessonSlug={slug} />
                ) : (
                    <section className="flex-1">
                        <div className="flex flex-col justify-between p-8 h-full">
                            <div className="h-full w-full max-w-screen-xl max-h-[60vh]">
                                <h2 className="text-3xl font-bold text-center text-gray-100 mt-20">
                                    Seja bem-vindo ao curso especializado em...
                                </h2>
                                <p className="flex items-center justify-center text-gray-100 mt-40 text-2xl tracking-wide">
                                    <span>
                                        Escolha uma das aulas para começar...
                                    </span>
                                    <ArrowCircleRightIcon className="w-16 h-auto text-blue-500 ml-4" />
                                </p>
                            </div>
                            <Footer />
                        </div>
                    </section>
                )}
                <Sidebar />
            </main>
        </div>
    );
}
