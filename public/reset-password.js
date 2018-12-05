console.log("Loaded Reset-Password logic");

// Define components _before_ creating the Vue object.
Vue.component('reset-password-static-heading', {
    template: '<h2>Fancier Reset Password Page</h2>'
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

// Create a new Vue object attached to the reset-password form.
let resetPassword = new Vue({
    el: '#reset-password-page',
    data: {
        password: '',
        newPassword: '',
        confirmPassword: ''
    },
    computed: {
        errors: function () {
            let messages = [];

            document.getElementById("submitButton").disabled= true;

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

                //newPassword
                if (!this.newPassword.length) {
                    messages.push({
                        severity: 'danger',
                        msge: 'New Password must not be empty'
                    })
                } else {
                    if (!this.newPassword.match(/[A-Z]/)) {
                        messages.push({
                            severity: 'warning',
                            msge: 'New Password requires at least one upper-case letter'
                        });
                    }

                    if (!this.newPassword.match(/[a-z]/)) {
                        messages.push({
                            severity: 'warning',
                            msge: 'New Password requires at least one lower-case letter'
                        });
                    }

                    if (!this.newPassword.match(/[0-9]/)) {
                        messages.push({
                            severity: 'warning',
                            msge: 'New Password requires at least one digit'
                        });
                    }

                    if (this.newPassword.length < 8) {
                        messages.push({
                            severity: 'danger',
                            msge: 'New Password must be at least eight characters long'
                        });
                    }

                    if (!this.newPassword.match(this.confirmPassword)){
                        messages.push({
                            severity: 'danger',
                            msge: 'New Passwords must match'
                        });
                    }

                    if(messages.length === 0){
                        document.getElementById("submitButton").disabled= false;
                    }
                }

            }
            return messages;
        }
    }
});
