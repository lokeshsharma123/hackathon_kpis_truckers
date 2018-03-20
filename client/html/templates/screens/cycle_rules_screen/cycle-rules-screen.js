Template.cycle_rules_screen.helpers({
    option1: function() {
        return {
            string: function() {
                return "SAVE"
            },
            save: function() {
                var cycle_rule=$("#cycle_rule").val();
                var restart=$("#restart").val();
                var rest_break=$("#rest_break").val();
                var short_haul_exception=$("#short_haul_exception").val();
                  var obj = {
                    cycle_rule: cycle_rule,
                    restart: restart,
                    rest_break: rest_break,
                    short_haul_exception: short_haul_exception
                }
				 
                Meteor.call('insert_primary_cycle', obj, function(err,res) {
                   if(err)
                   {
                    show_toast(err);
                    return;
                   }
                  // $("form").trigger("reset");
				  
                   show_toast("Saved successfully")
                });
            }
			
        }
    }
});


Template.cycle_rules_screen.onRendered(function() {
    $('select').material_select();     
})


Template.cycle_rules_screen.onCreated(function () {
 this.currentDate = new ReactiveVar( "" );
  
});