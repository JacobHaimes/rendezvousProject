// Standard Node modules
const Path = require('path');   // Files and directories

// Hapi
const Boom = require('boom');   // Error reporting
const Joi = require('joi');     // Input validation
const Hapi = require('hapi');   // Server

// Other
const Handlebars = require('handlebars');   // Template engine

const knex = require("knex")({
    client: "pg",
    connection: {
    host: "faraday.cse.taylor.edu",
        database: "jacob_haimes",
        user: "jacob_haimes",
        password: "legahajo"
    }
});

const server = Hapi.server({
    host: 'localhost',
    port: 8080,
    routes: {
        files: {
            // Make file requests relative to the public directory.
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});

async function init() {
    // Show routes at startup.
    await server.register(require('blipp'));

    // Output logging information.
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true
        }
    });


    // Configure templating.
    await server.register(require('vision'));
    server.views({
        engines: {
            hbs: Handlebars,
            html: Handlebars
        },
        isCached: false,            // Don't cache pages during development.
        defaultExtension: 'hbs',    // Most common
        relativeTo: __dirname,      // Template directory tree right here
        path: './templates',        // Top-level template directory
        layout: 'base',             // Default layout file
        layoutPath: './templates/layout',       // Location of layout file(s)
        partialsPath: './templates/partials'    // Location of partial file(s)
    });

    // Configure static file service.
    await server.register(require('inert'));

    // Configure routes.
    server.route([
        {
            method: 'GET',
            path: '/',
            config: {
                description: 'Home page'
            },
            handler: async (request, h) => {
                return h.view('index');
            }
        },
        {
            method: 'GET',
            path: '/log_in',
            config: {
                description: 'Log In page'
            },
            handler: async (request, h) => {
                return h.view('log_in.hbs');
            }
        },
        {
            method: 'POST',
            path: '/log_in',
            config: {
                description: 'Handle log_in request',
                validate: {
                    payload: {
                        email: Joi.string().email().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request, h) => {
                let messages = [];
                var emailCheck = request.payload.email;
                let memberID = null;
                await knex("member").where('email', emailCheck)
                    .select('memberid')
                    .then(member => (memberID = member));
                console.log("test1");
                memberID = memberID[0].memberid;
                console.log("test1");

                if (!request.payload.email.match(/^\w+@\w+\.\w{2,}$/)) {
                    messages.push(`'${request.payload.email}' is an invalid email address`);
                }

                if (!request.payload.password.match(/[A-Z]/)) {
                    messages.push('Password requires at least one upper-case letter');
                }

                if (!request.payload.password.match(/[a-z]/)) {
                    messages.push('Password requires at least one lower-case letter');
                }

                if (!request.payload.password.match(/[0-9]/)) {
                    messages.push('Password requires at least one digit');
                }

                if (request.payload.password.length < 8) {
                    messages.push('Password must be at least eight characters long');
                }



                if (messages.length) {
                    return h.view('log_in.hbs', {errors: messages})
                } else {
                    return h.view('index', {flash: ['Logged in successfully!']});
                }
            }
        },
        {
            method: 'GET',
            path: '/set-core-hours',
            config: {
                description: 'Set Core Hours'
            },
            handler: async (request, h) => {

                return h.view('set-core-hours.hbs');
            }
        },
        {
            method: 'POST',
            path: '/set-core-hours',
            config: {
                description: 'Handle set core hours request',
            },
            handler: async (request, h) => {
                var memberId = "1"; //todo change to the thing it's supposed to be
                knex('member').where('memberid', '=', memberId)
                    .update('corehoursstart', request.payload.coreHoursStart.toString())
                    .update('corehoursend', request.payload.coreHoursEnd.toString())
                    .then(result => console.log("Problem 3:\n" + JSON.stringify(result, null, 4)));
                //console.log("TEST");
                console.log("Start " + request.payload.coreHoursStart.toString());
                console.log(" END " + request.payload.coreHoursEnd.toString());
                return h.view('set-core-hours.hbs');
            }
        },
        {
            method: 'GET',
            path: '/sign-up',
            config: {
                description: 'Sign-up page'
            },
            handler: async (request, h) => {
                return h.view('sign-up.hbs');
            }
        },
        {
            method: 'POST',
            path: '/sign-up',
            config: {
                description: 'Handle sign-up request',
                validate: {
                    payload: {
                        email: Joi.string().email().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request, h) => {
                let messages = [];
                if (!request.payload.email.match(/^\w+@\w+\.\w{2,}$/)) {
                    messages.push(`'${request.payload.email}' is an invalid email address`);
                }

                if (!request.payload.password.match(/[A-Z]/)) {
                    messages.push('Password requires at least one upper-case letter');
                }

                if (!request.payload.password.match(/[a-z]/)) {
                    messages.push('Password requires at least one lower-case letter');
                }

                if (!request.payload.password.match(/[0-9]/)) {
                    messages.push('Password requires at least one digit');
                }

                if (request.payload.password.length < 8) {
                    messages.push('Password must be at least eight characters long');
                }

                if (messages.length) {
                    return h.view('sign-up.hbs', {errors: messages})
                } else {
                    return h.view('index', {flash: ['Signed up successfully!']});
                }
            }
        },
        {
            method: 'GET',
            path: '/reset-password',
            config: {
                description: 'Reset-password page'
            },
            handler: async (request, h) => {
                return h.view('reset-password.hbs');
            }
        },
        {
            method: 'POST',
            path: '/reset-password',
            config: {
                description: 'Handle reset-password request',
                validate: {
                    payload: {
                        password: Joi.string().required(),
                        newPassword: Joi.string().required(),
                        confirmPassword: Joi.string().required()
                    }
                }
            },
            handler: async (request, h) => {
                let messages = [];

            }
        },
        {
            method: 'GET',
            path: '/public/{param*}',
            config: {
                description: 'Public assets'
            },
            handler: {
                directory: {
                    path: '.',
                    redirectToSlash: true,
                    index: false
                }
            }
        }
    ]);

    // Start the server.
    await server.start();
    console.log(`Server running at ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
});

// Go!
init();