const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        const message = 'You have not provide an authentification jeton, please fill it in the headers of the request';
        return res.status(401).json({ message })
    }

    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.jwt_token_private_key, (error, decodedToken) => {
    if (error) {
        const message = 'Users cannot access this resources';
        res.status(401).json({ message, data: error})
    }

    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
        const message = 'User password is not valid';
        res.status(401).json({ message })
    }
    else{
        next()
        }
    })
};