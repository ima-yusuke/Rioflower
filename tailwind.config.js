import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        "./node_modules/flowbite/**/*.js"
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors:{
                "top-white":"rgb(248,248,248)",
                "top-button-pink":"rgb(254,135,185)",
                "main-bg":"rgb(237,230,215)",
                "main-brown":"rgb(191,158,116)",
                "answers-container-border":"rgb(217,217,217)",
                "detail-bg":"rgb(255,248,248)",
                "main-gray":"rgb(209,209,209)"
            },
            boxShadow: {
                'back-btn-shadow': '0 3px 5px rgba(0, 0, 0, 0.3)',
            },
        },
    },

    plugins: [forms,require('flowbite/plugin')],
};
