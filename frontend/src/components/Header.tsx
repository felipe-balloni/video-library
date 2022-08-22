import { Logo } from './Logo';

export function Header() {
    return (
        <header className="w-full bg-blue-800 py-5 flex items-center justify-center">
            <Logo />
        </header>
    );
}
