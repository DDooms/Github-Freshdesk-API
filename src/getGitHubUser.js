const axios = require('axios');

async function getGitHubUser(username) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching GitHub user:', error.message);
        throw error;
    }
}

module.exports = getGitHubUser;
