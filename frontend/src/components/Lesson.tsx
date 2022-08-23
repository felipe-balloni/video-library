import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {
    CheckCircleIcon,
    LockClosedIcon,
    LockOpenIcon
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date | null;
    type: 'Live' | 'Hands-on';
}

export function Lesson(props: LessonProps) {
    const isLessonAvailable = () => {
        if (!props.availableAt) {
            return (
                <span className="text-sm text-red-500 font-medium flex items-center gap-2">
                    <LockOpenIcon className="h-5 w-auto" />
                    Livre
                </span>
            );
        }
        if (isPast(props.availableAt)) {
            return (
                <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-auto" />
                    Conteúdo liberado
                </span>
            );
        } else {
            return (
                <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
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
            <div className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors duration-150">
                <header className="flex items-center justify-between">
                    {isLessonAvailable()}
                    <span className="text-xs rounded px-2 py-0.5 text-white border border-green-300 font-bold">
                        {props.type === 'Live' ? 'AO VIVO' : 'Aula Prática'}
                    </span>
                </header>
                <strong className="text-gray-200 block mt-5">
                    {props.title}
                </strong>
            </div>
        </Link>
    );
}
