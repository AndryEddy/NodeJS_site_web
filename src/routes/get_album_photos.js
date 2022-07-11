const FB = require('fb');
const fs =  require('fs');

module.exports = (app) => {
    app.get('/api/fb/login', (req, res) =>{
        //FB.getLoginUrl({appId: '2094556004047819'});.
        //FB.options({version: 'v14.0'});

        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                // The user is logged in and has authenticated your
                // app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed
                // request, and the time the access token
                // and signed request each expire.
                const uid = response.authResponse.userID;
                const accessToken = response.authResponse.accessToken;
                const message = `FB user connected successfully`;
                return res.json({message, uid, accessToken})
            } else if (response.status === 'not_authorized') {
                // The user hasn't authorized your application.  They
                // must click the Login button, or you must call FB.login
                // in response to a user gesture, to launch a login dialog.
                const message = `Cannot access FB API: Unauthorized`;
                return res.status(401).json({message})
            } else {
                // The user isn't logged in to Facebook. You can launch a
                // login dialog with a user gesture, but the user may have
                // to log in to Facebook before authorizing your application.
                const message = `User not logged in`;
                return res.status(400).json({message})
            }
        });

        //
        //
        // const token = 'f5a2c1570e961ec66e99b0b671120660';
        // const appsecret = '439a13644ef41133437d972ad9d266a7';
        // FB.setAccessToken({accessToken: token});
        //
        // FB.api('me/photos', 'post', { source: fs.createReadStream('./git.jpg'), caption: 'T.E' }, function (res) {
        //     if(!res || res.error) {
        //         console.log(!res ? 'error occurred' : res.error);
        //         return;
        //     }
        //     console.log('Post Id: ' + res.post_id);
        // });
        //
        // FB.login(response => {
        //     if(response.authResponse) console.log('Logged in');
        //     else console.log('Cancelled authorization');
        // }, {scope: 'user_photos'});


    });
};

