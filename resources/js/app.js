import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Ziggy } from "./ziggy.js";
import { route } from "ziggy-js";

import "../css/app.css";

createInertiaApp({
    title: (title) => `${title} - Digital Dhikr`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        ),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) }).use(plugin);

        // Make route function available globally
        app.config.globalProperties.route = (
            name,
            params,
            absolute,
            config = Ziggy
        ) => route(name, params, absolute, config);

        return app.mount(el);
    },
    progress: {
        color: "#4F46E5",
    },
});
