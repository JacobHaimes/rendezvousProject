console.log("Loaded set core hours logic");

// Define components _before_ creating the Vue object.

Vue.component('error-msge', {
    props: ['msge', 'severity'],
    template: `<div class="alert" v-bind:class="'alert-' + severity">{{ msge }}</div>`
});

// Control...     If true   If false
// ----------------------------------
// Been visited   touched   untouched
// Has changed	  dirty     pristine
// Is valid       valid     invalid

// Create a new Vue object attached to the sign-up form.
let signUp = new Vue({
    el: '#set-core-hours',
    data: {
        oldcorehoursstart: 'pizza',
        oldcorehoursend: 'piz'
    },
    computed: {
        errors: function () {
            let messages = [];

            return messages;
        }
    }
});
