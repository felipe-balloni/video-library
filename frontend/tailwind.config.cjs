/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            white: "#fff",
            black: "#000",
            green: {
                300: '#00B37E',
                500: '#00875F',
                700: '#015F43',
            },
            blue: {
                500: '#81D8F7',
            },
            orange: {
                500: '#FBA94C',
            },
            red: {
                500: '#F75A68',
            },
            gray: {
                100: '#E1E1E6',
                200: '#C4C4CC',
                300: '#8D8D99',
                500: '#323238',
                600: '#29292E',
                700: '#121214',
                900: '#09090A'
            }
        },
        extend: {
            backgroundImage: {
                blur: "url('/src/assets/ReactJS-icon.svg'),url('/src/assets/blur.png')",
            },
            backgroundPosition: {
                blur: 'top,center',
            },
            backgroundSize: {
                blur: 'auto,cover',
            },
            fontFamily: {
                sans: ["Roboto", "sans-serif"],
            },
        },
    },
    plugins: [],
}
