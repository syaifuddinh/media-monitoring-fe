import Vue from 'vue';
import Datepicker from 'vuejs-datepicker';
import { Timepicker } from '@livelybone/vue-datepicker';
import '~/assets/css/livelybone-datepicker.scss';

Vue.component('date-picker', Datepicker);
Vue.component('TimePicker', Timepicker);
