import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import EventsPreview from "../../resources/js/components/EventsPreview";

app = createApp({}).mount('#app')

app.component('EventsPreview', EventsPreview)
