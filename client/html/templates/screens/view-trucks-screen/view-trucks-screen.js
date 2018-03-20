Template.view_trucks_screen.helpers({
"truck_list":function(){
var truck_list=Truck.find({company_id:Meteor.userId(),isActive:true}).fetch()
if(truck_list.length)
return truck_list
}
})

Template.view_trucks_screen.events({
"click .row_link":function(){
Router.go("/view-truck/"+this._id);
}
});
