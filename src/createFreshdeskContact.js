const axios = require('axios');
const getExistingFreshdeskContact = require('./getExistingFreshdeskContact');

async function createFreshdeskContact(subdomain, contactData) {
    try {
        const freshdeskToken = process.env.FRESHDESK_TOKEN;

        const existingContact = await getExistingFreshdeskContact(subdomain, contactData.email);

        if (existingContact) {
            const response = await axios.put(
                `https://${subdomain}.freshdesk.com/api/v2/contacts/${existingContact.id}`,
                contactData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${Buffer.from(freshdeskToken + ':X').toString('base64')}`,
                    },
                }
            );

            const updatedContact = response.data;

            console.log(updatedContact);
            return updatedContact;
        } else {
            const response = await axios.post(
                `https://${subdomain}.freshdesk.com/api/v2/contacts`,
                contactData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${Buffer.from(freshdeskToken + ':X').toString('base64')}`,
                    },
                }
            );

            const newContact = response.data;

            console.log(newContact);
            return newContact;
        }
    } catch (error) {
        console.error('Error creating or updating Freshdesk contact:', error.message);
    }
}

module.exports = createFreshdeskContact;
