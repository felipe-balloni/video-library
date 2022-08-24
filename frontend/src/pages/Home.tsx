import { FormEvent, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Logo } from '../components/Logo';
import { Footer } from '../components/Footer';
import codeMock from '/src/assets/code-mock.png';
import { useNavigate } from 'react-router-dom';

const CREATE_SUBSCRIBER = gql`
    mutation createSubscriber($name: String!, $email: String!) {
        createSubscriber(data: { name: $name, email: $email }) {
            data {
                id
                attributes {
                    name
                    email
                }
            }
        }
    }
`;

export function Home() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER);

    function handeSubscribe(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // TODO: validate form
        createSubscriber({ variables: { name, email } }).then(() => {
            navigate('/event');
        });
    }

    return (
        <>
            <section className="bg-no-repeat bg-blur min-h-screen flex flex-col">
                <div className="w-full max-w-screen-xl flex items-center justify-between mt-20 mx-auto">
                    <div className="max-w-screen-sm">
                        <Logo />
                        <h1 className="text-4xl mt-8 leading-tight">
                            Construa uma{' '}
                            <strong className="text-blue-500">
                                aplicação completa
                            </strong>
                            , do zero, com{' '}
                            <strong className="text-blue-500">React</strong>
                        </h1>
                        <p className="mt-4 text-gray-300 leading-relaxed">
                            Em apenas uma semana você vai dominar na prática uma
                            das tecnologias mais utilizadas e com alta demanda
                            para acessar as melhores oportunidades do mercado.
                        </p>
                    </div>
                    <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                        <strong className="block mb-6 text-2xl">
                            Inscreva-se gratuitamente
                        </strong>
                        <form
                            onSubmit={handeSubscribe}
                            className="flex flex-col w-full gap-2"
                        >
                            <input
                                type="text"
                                placeholder="Nome"
                                className="bg-gray-900 rounded px-5 h-14"
                                onChange={e => setName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Digite seu e-mail"
                                className="bg-gray-900 rounded px-5 h-14"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-green-500 rounded px-5 h-14 mt-4 uppercase font-bold text-sm hover:bg-green-700 transition-colors duration-150
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Inscrever-se
                            </button>
                        </form>
                    </div>
                </div>
                <div className="w-full max-w-screen-xl mx-auto">
                    <img src={codeMock} alt="" className="mt-10" />
                </div>
            </section>
            <div className="-mt-20 mb-6 px-8">
                <Footer />
            </div>
        </>
    );
}
