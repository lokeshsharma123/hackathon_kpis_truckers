Template.trailer_defects_list.helpers({
    "trailer_defects": function() {
        var defects = TrailerDefectsList.find().fetch();

        return defects
    }
})


Template.trailer_defects_list.helpers({
    option: function() {
        return {
            string: function() {
                return "DONE"
            },
            save: function() {
              var defects_array=[];
              $(".defect").each(function(){
                if(this.checked)
                defects_array.push({_id:this.id,defect:$(this).attr("defect")})
              })
            //  Session.set("trailer_defects_array",defects_array)
			  Meteor.call("insertDVIRTrailerDefect",{trailer_defects_array:defects_array,date_of_entry:Session.get("CurrentDate"),company_id:Session.get("company_id_to_subscribe")},function(err,res){
			    Session.set("show_trailer_defect_screen",false)
			  })
			  
             // history.go(-1)
            /*
                Meteor.call('save_trailer_defects',defects_array, function(err) {
                    if (err)
                        alert(err.message);
                    else {

                        history.go(-1)


                    }
                });
                */
            }
        }
    }
});