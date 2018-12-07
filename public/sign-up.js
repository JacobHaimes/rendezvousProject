console.log("Loaded sign-up logic");

// Define components _before_ creating the Vue object.
Vue.component('sign-up-static-heading', {
    template: '<h2>Fancier Sign-Up Page</h2>'
});

Vue.component('log-in-static-heading', {
    template: '<h2>Log In Page</h2>'
});

Vue.component('instructions', {
    props: ['details'],
    template: '<p><strong>Instructions</strong>: {{ details }}</p>'
});

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
    el: '#sign-up-page',
    data: {
        email: '',
        password: ''
    },
    computed: {
        errors: function () {
            let messages = [];
            if (!this.email.length) {
                messages.push({
                    severity: 'danger',
                    msge: 'Email must not be empty'
                })
            } else if (!this.email.match(/^\w+@\w+\.\w{2,}$/)) {
                messages.push({
                    severity: 'danger',
                    msge: `'${this.email}' is an invalid email address`
                });
            }

            if (!this.password.length) {
                messages.push({
                    severity: 'danger',
                    msge: 'Password must not be empty'
                })
            } else {
                if (!this.password.match(/[A-Z]/)) {
                    messages.push({
                        severity: 'warning',
                        msge: 'Password requires at least one upper-case letter'
                    });
                }

                if (!this.password.match(/[a-z]/)) {
                    messages.push({
                        severity: 'warning',
                        msge: 'Password requires at least one lower-case letter'
                    });
                }

                if (!this.password.match(/[0-9]/)) {
                    messages.push({
                        severity: 'warning',
                        msge: 'Password requires at least one digit'
                    });
                }

                if (this.password.length < 8) {
                    messages.push({
                        severity: 'danger',
                        msge: 'Password must be at least eight characters long'
                    });
                }
            }
            return messages;
        }
    }
});
