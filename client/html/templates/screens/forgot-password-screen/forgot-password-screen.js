 Template.forgot_password_screen.helpers({
     option: function() {
         return {
             string: function() {
                 return "SUBMIT"
             },
             save: function() {
                 var email = $("[name=email]").val();

                 if (!validateEmail(email)) {
                     show_toast("Please Enter Valid Email Address");
                     return;
                 }

                 var options = { email: email };
                 Accounts.forgotPassword(options, function(err,res) {
				 console.log(err)
				 console.log(res)
                     if (err) {
                         show_toast(err.message)
                         return

                     }
                     show_toast("Passoword reset link has been sent to your email address")

                 });

             }
         }
     }

 });
 Template.ResetPassword.helpers({
     option: function() {
         return {
             string: function() {
                 return "SAVE"
             },
             save: function() {
                 var password = $("[name=password]").val();
                 var passwordConfirm = $("[name=password-confirm]").val();
                 if (password !== passwordConfirm) {
                     show_toast("password are not same");
                     return
                 }
                 Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {

                     if (err) {
                         show_toast(err.message);
                     } else {
                         show_toast('Your password has been changed. Welcome back!');
                         Session.set('resetPassword', null);
                     }
                 });
                 return false;
             }
         }
     }
 });
 if (Accounts._resetPasswordToken) {
     Session.set('resetPassword', Accounts._resetPasswordToken);
 }

 Template.ResetPassword.helpers({
     resetPassword: function() {
         return Session.get('resetPassword');
     }
 });
