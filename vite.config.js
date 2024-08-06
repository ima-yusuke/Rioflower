import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/js/index.js',
                'resources/js/nickname.js',
                'resources/js/check.js',
                'resources/js/question.js',
                'resources/js/admin/dash-product.js',
                'resources/js/admin/dash-link.js',
                'resources/js/admin/dash-question.js',
                'resources/js/admin/dash-add-attribute.js',
                'resources/js/admin/dash-question-attribute.js',
                'resources/js/admin/dash-product-attribute.js',
                'resources/js/admin/dash-word.js',
                'resources/js/admin/dash-mail-forward.js',
                'resources/js/admin/dash-image.js',
            ],
            refresh: true,
        }),
    ],
    server: {
        hmr: {
            host: 'localhost'
        }
    },
    build: {
        manifest: 'manifest.json',
        rollupOptions: {
            input: {
                app: 'resources/js/app.js',
                appStyles: 'resources/css/app.css',
                index: 'resources/js/index.js',
                nickname: 'resources/js/nickname.js',
                main: 'resources/js/question.js',
                check: 'resources/js/check.js',
                dashProduct: 'resources/js/admin/dash-product.js',
                dashLink: 'resources/js/admin/dash-link.js',
                question: 'resources/js/admin/dash-question.js',
                dashAddAttribute: 'resources/js/admin/dash-add-attribute.js',
                dashQuestionAttribute: 'resources/js/admin/dash-question-attribute.js',
                dashProductAttribute: 'resources/js/admin/dash-product-attribute.js',
                dashMessage: 'resources/js/admin/dash-word.js',
                dashMailForward: 'resources/js/admin/dash-mail-forward.js',
                dashImage: 'resources/js/admin/dash-image.js',
            }
        }
    }
});
