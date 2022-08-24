import { LogoFooter } from './Logo';
import React from 'react';

export function Footer() {
    return (
        <footer className="flex items-center justify-between gap-8 mt-20 border-t border-gray-500 pt-6">
            <LogoFooter />
            <strong className="text-gray-300 flex-1">
                Rocketseat - Todos os direitos reservados
            </strong>
            <a href="#" className="text-gray-300 hover:text-gray-200 text-sm">
                Políticas de privacidade
            </a>
        </footer>
    );
}
