Template.sign_log.helpers({
"signature":function(){
var user=Meteor.user();
if(user)
return user.profile.signature
}
})

Template.sign_log.events({
"click #test6":function(){
Session.set("tabbar1_active_tab","tab1")
}
})

