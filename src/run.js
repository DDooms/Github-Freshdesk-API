const getGitHubUser = require('./getGitHubUser');
const createFreshdeskContact = require('./createFreshdeskContact');


const username = 'DDooms';
const subdomain = 'dooms';
const contactData = {
    name: 'Test name',
    email: 'testnew@gmail.com',
};


getGitHubUser(username)
    .then(() => {
        createFreshdeskContact(subdomain, contactData)
            .then(() => {
                console.log('Freshdesk contact created successfully.');
            })
            .catch((error) => {
                console.error('Error creating Freshdesk contact:', error);
            });
    })
    .catch((error) => {
        console.error('Error fetching GitHub user:', error);
    });
