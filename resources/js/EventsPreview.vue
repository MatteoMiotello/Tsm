<script>
import EventPreview from "./EventPreview.vue";
import moment from "moment";

export default {
    name: "EventsPreview",
    components: {EventPreview},
    data() {
        return {
            events: new Map,
            dates: [],
            currentDate: null,
            currentIndex: 0,
            otherEvents: [],
        }
    },
    async created() {
        const now = moment().toISOString();
        const response = await fetch('/api/collections/events/entries?filter[date:gte]=' + now);
        const data = await response.json();

        let dates = data.data.map((event) => {
            this.events.set(event.date, [])
            return [event.date, []];
        });

        let map = new Map(dates.sort());

        data.data.map((event) => {
            let events = map.get(event.date);
            events.push(event);

            map.set(event.date, events);
        })


        const [first] = map.keys();
        this.events = map;
        this.dates = Array.from(map.keys());
        this.currentDate = first;
        this.currentIndex = 0;
    },
    computed: {
        currentEvents() {
            return this.events.get(this.currentDate) ?? [];
        },
        currentEvent() {
            if (!this.currentEvents) {
                return null;
            }

            return this.currentEvents[this.currentIndex];
        },
        dates() {
            if (!this.events) {
                return '';
            }

            return this.dates.map((value) => {
                return {
                    display: moment(value).format('dddd D MMM'),
                    real: value,
                }
            })
        }
    },
    methods: {
        nextEvent(event) {
            const first = this.currentEvents.shift();
            this.currentEvents.push(first);
        },
        prevEvent(event) {
            const last = this.currentEvents.pop();
            this.currentEvents.unshift(last);
        },
        selectDate(date) {
            this.currentDate = date;
        }
    }
}
</script>
<template>
    <div class="">
        <ul class="flex mb-10">
            <li v-for="date in dates" class="font-sans mr-3 ">
                <button @click="selectDate(date.real)"
                        :class="this.currentDate == date.real ? 'text-primary underline font-bold' : ''">
                    {{ date.display }}
                </button>
            </li>
        </ul>
        <div class="flex justify-between my-auto w-full" v-if="currentEvent">
            <button @click="prevEvent">
                <i class="fa-solid fa-arrow-left"></i>
            </button>
            <EventPreview v-bind:event="currentEvent"></EventPreview>
            <TransitionGroup name="list" class="flex flex-row items-baseline" tag="ul">
                    <li v-for="event in currentEvents.slice( 0, 3 )" :key="event">
                        <img v-bind:src="event.thumbnail.url" v-bind:alt="event.thumbnail.url"
                             class="aspect-[1/1.42] ml-2 backdrop-opacity-95 backdrop-invert bg-white/30 transition ease-in-out delay-500 "
                             :class="currentEvent.id != event.id ? 'h-60 transition-all' : 'w-64 transition-all'">
                    </li>
            </TransitionGroup>
            <button @click="nextEvent">
                <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    </div>
</template>

<style>
.list-move {
    transition: all 0.5s ease;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}


.list-enter-from {
    transform: translateX(30px);
}

.list-leave-to {
    opacity: 0;
    /*transform: translateX(30px);*/
}

.list-leave-active {
    position: absolute;
}
</style>




