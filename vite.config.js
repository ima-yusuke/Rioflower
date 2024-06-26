import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/js/index.js',
                'resources/js/check.js',
                'resources/js/admin/dash-product.js',
                'resources/js/admin/dash-link.js',
                'resources/js/admin/dash-question.js',
                'resources/js/admin/dash-add-attribute.js',
                'resources/js/admin/dash-question-attribute.js',
                'resources/js/admin/dash-product-attribute.js',
                'resources/js/admin/dash-message.js',
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
        manifest: true,
        rollupOptions: {
            input: {
                app: 'resources/js/app.js',
                appStyles: 'resources/css/app.css',
                index: 'resources/js/index.js',
                check: 'resources/js/check.js',
                dashProduct: 'resources/js/admin/dash-product.js',
                dashLink: 'resources/js/admin/dash-link.js',
                question: 'resources/js/dash-question.js',
                dashAddAttribute: 'resources/js/admin/dash-add-attribute.js',
                dashQuestionAttribute: 'resources/js/admin/dash-question-attribute.js',
                dashProductAttribute: 'resources/js/admin/dash-product-attribute.js',
                dashMessage: 'resources/js/admin/dash-message.js',
            }
        }
    }
});
