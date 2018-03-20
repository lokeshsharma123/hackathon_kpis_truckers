Template.primary_cycle.helpers({
"received_cycle_rule":function(){
if(this.user)
return this.user.cycle_rule
},
"cycle_rule_list":function(){
var array=CycleRuleList.find().fetch();
if(array.length>0)
return array
},
"restart_rule_list":function(){
var array=RestartRuleList.find().fetch();
if(array.length>0)
return array
},
"rest_break_list":function(){
var array=RestBreakList.find().fetch();
if(array.length>0)
return array
},
"short_haul_exception_list":function(){
var array=ShortHaulExceptionList.find().fetch();
if(array.length>0)
return array
}
});