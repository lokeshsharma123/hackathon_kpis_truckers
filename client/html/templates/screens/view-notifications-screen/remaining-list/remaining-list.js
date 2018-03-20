Template.remaining_list.helpers({
"list":function(){
var rem=[];
var dvir=DVIRLog.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
if(dvir && !dvir.is_completely_filled)
rem.push({name:"DVIR Screen"});
var form=Form.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
if(form && !form.is_completely_filled)
rem.push({name:"Form Screen"});
return rem
}
})
Template.remaining_list.events({
"click .rem_list":function(e,tpl){
if(this.name=="DVIR Screen")
Session.set("tabbar1_active_tab","tab3")
if(this.name=="Form Screen")
Session.set("tabbar1_active_tab","tab2")

}
})