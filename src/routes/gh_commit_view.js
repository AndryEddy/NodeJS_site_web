const { Octokit } = require("@octokit/core");
const { db_access } = require('../db/bridge');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.get('/api/gh/commit/view', auth, async (req, res) => {
        const octokit = new Octokit({
            auth: process.env.github_access_token
        });

        await octokit.request('GET /repos/{owner}/{repo}/commits', {
            owner: process.env.github_owner,
            repo: process.env.github_repo
        }).then(result => {
            const message = `Commits list achieved successfully`;
            return res.json({ message, data: result})
        }).catch(error => {
            if (error) {
                const message = `An error occurend when accessing Github API, URL: /api/gh/commit/view`;
                return res.status(400).json({ message, data: error })
            }
        });
    });
};

