<template>
    <Transition mode="out-in">
    <div class="mr-3 my-auto w-48 font-sans" :key="event.id">
            <i class="fa-regular fa-calendar"></i><span class="ml-1">{{ eventDate }}</span>
            <br><span v-for="time in event.event_times"> <i class="fa-regular fa-clock"></i> {{
                time.time
            }} {{ time.duration }} min</span>
            <h3 class="text-primary font-bold mt-3 text-lg">{{ event.title }}</h3>
            <h4 v-html="event.subtitle"></h4>
            <a v-bind:href="'/events/' + event.id" class="mt-6 text-primary">
                Scopri di più
            </a>
    </div>
    </Transition>
</template>

<script>
import moment from "moment";
import 'moment/dist/locale/it';

export default {
    name: "EventPreview",
    props: [
        'event'
    ],
    computed: {
        eventDate() {
            if (this.event) {
                const date = this.event.date;
                return moment(date).format('D MMMM Y');
            }

            return '';
        }
    }
}
</script>

<style>
.v-enter-active {
    transition: all 0.25s ease-in-out;
}
.v-leave-active {
    transition: all 0.25s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    transform: translateX(-15px);
    opacity: 0;
}
</style>
