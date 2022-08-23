import { Lesson } from './Lesson';
import { gql, useQuery } from '@apollo/client';

const GET_LESSONS_QUERY = gql`
    query GetLessons {
        lessons(sort: ["availableAt:asc"]) {
            data {
                id
                attributes {
                    title
                    slug
                    description
                    availableAt
                    type
                }
            }
        }
    }
`;

interface GetLessonsResponse {
    lessons: {
        data: [
            {
                id: string;
                attributes: {
                    title: string;
                    slug: string;
                    availableAt: Date;
                    type: 'Live' | 'Hands-on';
                };
            }
        ];
    };
}

export function Sidebar() {
    const { data } = useQuery<GetLessonsResponse>(GET_LESSONS_QUERY);

    return (
        <aside className="w-80 bg-gray-700 p-6 border-l border-gray-600">
            <h2 className="font-bold text-2xl pb-6 border-b border-gray-500">
                Cronograma de aulas
            </h2>
            <div className="flex flex-col space-y-8">
                {data?.lessons.data.map(lesson => {
                    const availableAt =
                        lesson.attributes.availableAt &&
                        new Date(lesson.attributes.availableAt);
                    return (
                        <Lesson
                            key={lesson.id}
                            title={lesson.attributes.title}
                            slug={lesson.attributes.slug}
                            availableAt={availableAt}
                            type={lesson.attributes.type}
                        />
                    );
                })}
            </div>
        </aside>
    );
}
