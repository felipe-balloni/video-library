import { Lesson } from './Lesson';
import { useGetLessonsQuery } from '../graphql/generated';

export function Sidebar() {
    const { data } = useGetLessonsQuery();

    if (!data?.lessons?.data[0]) {
        return (
            <aside className="w-80 bg-gray-700 p-6 border-l border-gray-600">
                <h2 className="font-bold text-2xl pb-6 border-b border-gray-500">
                    Cronograma de aulas
                </h2>
                <div className="flex flex-col space-y-8">
                    <p>Carregando...</p>
                </div>
            </aside>
        );
    }

    return (
        <aside className="w-80 bg-gray-700 p-6 border-l border-gray-600">
            <h2 className="font-bold text-2xl pb-6 border-b border-gray-500">
                Cronograma de aulas
            </h2>
            <div className="flex flex-col space-y-8">
                {data?.lessons.data.map(lesson => {
                    const availableAt =
                        lesson.attributes?.availableAt &&
                        new Date(lesson.attributes?.availableAt);
                    return (
                        <Lesson
                            key={lesson.id}
                            title={lesson.attributes?.title ?? ''}
                            slug={lesson.attributes?.slug ?? ''}
                            availableAt={availableAt}
                            type={lesson.attributes?.type ?? 'Hands_on'}
                        />
                    );
                })}
            </div>
        </aside>
    );
}
