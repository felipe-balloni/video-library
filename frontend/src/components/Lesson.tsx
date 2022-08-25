import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {
    CheckCircleIcon,
    LockClosedIcon,
    LockOpenIcon
} from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date | null;
    type: 'Live' | 'Hands_on';
}

export function Lesson(props: LessonProps) {
    const { slug } = useParams<{ slug: string }>();
    const isActiveLesson = slug === props.slug;

    const isLessonAvailable = () => {
        if (!props.availableAt) {
            return (
                <span
                    className={classNames(
                        'text-sm font-medium flex items-center gap-2',
                        {
                            'text-white': isActiveLesson,
                            'text-red-500': !isActiveLesson
                        }
                    )}
                >
                    <LockOpenIcon className="h-5 w-auto" />
                    Livre
                </span>
            );
        }
        if (isPast(props.availableAt)) {
            return (
                <span
                    className={classNames(
                        'text-sm font-medium flex items-center gap-2',
                        {
                            'text-white': isActiveLesson,
                            'text-blue-500': !isActiveLesson
                        }
                    )}
                >
                    <CheckCircleIcon className="h-5 w-auto" />
                    Conteúdo liberado
                </span>
            );
        } else {
            return (
                <span
                    className={classNames(
                        'text-sm text-orange-500 font-medium flex items-center gap-2'
                    )}
                >
                    <LockClosedIcon className="h-5 w-auto" />
                    Em Breve
                </span>
            );
        }
    };

    const availableAtFormatted =
        props.availableAt !== null &&
        format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm'", {
            locale: ptBR
        });

    return (
        <Link to={`/event/lesson/${props.slug}`} className="group">
            <span className="text-gray-300">{availableAtFormatted}</span>
            <div
                className={classNames(
                    'rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors duration-15',
                    { 'bg-green-500': isActiveLesson }
                )}
            >
                <header className="flex items-center justify-between">
                    {isLessonAvailable()}
                    <span className="text-xs rounded px-2 py-0.5 text-white border border-green-300 font-bold">
                        {props.type === 'Live' ? 'AO VIVO' : 'Aula Prática'}
                    </span>
                </header>
                <strong
                    className={classNames('block mt-5 ', {
                        'text-white': isActiveLesson,
                        'text-gray-200': !isActiveLesson
                    })}
                >
                    {props.title}
                </strong>
            </div>
        </Link>
    );
}
