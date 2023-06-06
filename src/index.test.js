const getGitHubUser = require("./getGitHubUser")
const getExistingFreshdeskContact = require("./getExistingFreshdeskContact")
const createFreshdeskContact = require("./createFreshdeskContact")
const axios = require('axios');

jest.mock('axios');

describe('GitHub and Freshdesk Integration', () => {
    beforeEach(() => {
        axios.get.mockReset();
        axios.post.mockReset();
        axios.put.mockReset();
    });

    describe('getGitHubUser', () => {
        it('should retrieve GitHub user information', async () => {
            const mockResponse = {
                data:
                    {
                        login: 'DDooms',
                        name: 'Beray SS',
                        email: 'bs@example.com'
                    }
            };
            axios.get.mockResolvedValue(mockResponse);

            const result = await getGitHubUser('DDooms');

            expect(result).toEqual(mockResponse.data);
            expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/DDooms');
        });
    });

    describe('getExistingFreshdeskContact', () => {
        it('should retrieve an existing Freshdesk contact', async () => {
            const subdomain = 'dooms';
            const email = 'bss@example.com';
            const mockResponse = {data: [{id: '12345', name: 'Beray SS', email}]};
            axios.get.mockResolvedValue(mockResponse);

            const result = await getExistingFreshdeskContact(subdomain, email);

            expect(result).toEqual(mockResponse.data[0]);
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(subdomain), expect.any(Object));
        });
    });

    describe('createFreshdeskContact', () => {
        const subdomain = 'dooms';
        const contactData = {name: 'Beray SS', email: 'bss@example.com'};

        it('should create a new Freshdesk contact', async () => {
            const mockExistingResponse = {data: []};
            axios.get.mockResolvedValueOnce(mockExistingResponse);

            const mockCreateResponse = {data: {id: '12345', name: 'Beray SS', email: 'bss@example.com'}};
            axios.post.mockResolvedValue(mockCreateResponse);

            const result = await createFreshdeskContact(subdomain, contactData);

            expect(result).toEqual(mockCreateResponse.data);
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(subdomain), expect.any(Object));
            expect(axios.post).toHaveBeenCalledWith(expect.stringContaining(subdomain), expect.any(Object), expect.any(Object));
        });

        it('should update an existing Freshdesk contact', async () => {
            const existingContact = {id: '12345', name: 'Beray SS', email: 'bss@example.com'};
            const mockExistingResponse = {data: [existingContact]};
            axios.get.mockResolvedValueOnce(mockExistingResponse);

            const mockUpdateResponse = {data: {id: '12345', name: 'Updated Name', email: 'updated@example.com'}};
            axios.put.mockResolvedValue(mockUpdateResponse);

            const result = await createFreshdeskContact(subdomain, contactData);

            expect(result).toEqual(mockUpdateResponse.data);
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(subdomain), expect.any(Object));
            expect(axios.put).toHaveBeenCalledWith(expect.stringContaining(existingContact.id), expect.any(Object), expect.any(Object));
        });
    });
});
