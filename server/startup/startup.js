Meteor.startup(function() {
    var username = encodeURIComponent("anuragnagarkota@gmail.com")
    var password = encodeURIComponent("MY----PASSWORD")
        // process.env.MAIL_URL = 'smtp://' + username + ':' + password + '@smtp.gmail.com:465';
    Accounts.config({
        sendVerificationEmail: true,
        forbidClientAccountCreation: true
    });
});
