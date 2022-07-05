const { Octokit } = require("@octokit/core");
const { db_access } = require('../db/bridge');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.get('/api/gh/pullrequests/view', auth, async (req, res) => {
        const octokit = new Octokit({
            auth: process.env.github_access_token
        });

        await octokit.request('GET /repos/{owner}/{repo}/pulls', {
            owner: process.env.github_owner,
            repo: process.env.github_repo
        }).then(result => {
            const message = `Pull requests list achieved successfully`;
            return res.json({ message, data: result})
        }).catch(error => {
            if (error) {
                const message = `An error occurend when accessing Github API, URL: /api/gh/pullrequests/view`;
                return res.status(400).json({ message, data: error })
            }
        });
    });
};