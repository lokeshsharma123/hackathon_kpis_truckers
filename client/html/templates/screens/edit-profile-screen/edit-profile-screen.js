Template.edit_profile_screen.helpers({
"isCompany":function(){
var user= Users.findOne()
if(user)
return user.profile.type=="company"
}
})