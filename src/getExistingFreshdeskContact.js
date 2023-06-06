const axios = require('axios');

async function getExistingFreshdeskContact(subdomain, email) {
    try {
        const freshdeskToken = process.env.FRESHDESK_TOKEN;

        const response = await axios.get(
            `https://${subdomain}.freshdesk.com/api/v2/contacts`,
            {
                headers: {
                    // Content type is always specified, when you do a POST request
                    'Content-Type': 'application/json',

                    // There is a better and simpler way to do this
                    /*Authorization: `Basic ${Buffer.from(freshdeskToken + ':X').toString('base64')}`,*/
                    // Axios needs the auth to be 'encrypted' with both username and password
                },
                params: {
                    email: email,
                },
                auth: {
                    username: freshdeskToken,
                    password: '', // No password is required in my case
                },
            }
        );

        const contacts = response.data;

        if (contacts.length > 0) {
            return contacts[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving existing Freshdesk contact:', error.message);
    }
}

module.exports = getExistingFreshdeskContact;
