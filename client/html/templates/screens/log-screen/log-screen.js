Template.log_screen.onRendered(function(){
console.log(Session.get("tabbar1_active_tab"));
});
Template.log_screen.helpers({
"render":function(){
if(Session.get("tabbar1_active_tab")=="tab1")
return true;
else
return false
}
})