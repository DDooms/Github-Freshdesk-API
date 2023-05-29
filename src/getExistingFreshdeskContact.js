const axios = require('axios');

async function getExistingFreshdeskContact(subdomain, email) {
    try {
        const freshdeskToken = process.env.FRESHDESK_TOKEN;

        const response = await axios.get(
            `https://${subdomain}.freshdesk.com/api/v2/contacts`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${Buffer.from(freshdeskToken + ':X').toString('base64')}`,
                },
                params: {
                    email: email,
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
        throw error;
    }
}

module.exports = getExistingFreshdeskContact;
