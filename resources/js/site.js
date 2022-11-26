import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import persist from '@alpinejs/persist'
import focus from '@alpinejs/focus'
import 'focus-visible'
import {createApp} from "vue/dist/vue.esm-bundler.js";
import EventsPreview from "./EventsPreview.vue";
import '../css/site.css';
import moment from "moment/moment";
import 'moment/locale/it'
// Global get CSRF token function (used by forms).
window.getToken = async () => {
    return await fetch('/!/DynamicToken/refresh')
        .then((res) => res.json())
        .then((data) => {
            return data.csrf_token
        })
        .catch(function (error) {
            this.error = 'Something went wrong. Please try again later.'
        })
}

// Call Alpine.
// window.Alpine = Alpine
// Alpine.plugin(collapse)
// Alpine.plugin(persist)
// Alpine.plugin(focus)
// Alpine.start()
moment.locale('it' );

let app = createApp({
    components: {
        EventsPreview,
    },
    template: `<EventsPreview></EventsPreview>`
})

app.mount('#vue-app');





