const axios = require('axios');

async function getGitHubUser(username) {
    try {
        const githubToken = process.env.GITHUB_TOKEN;
        const response = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${githubToken}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching GitHub user:', error.message);
    }
}

module.exports = getGitHubUser;
