
var statusMap = {3.5: "Off Duty", 2.5: "Sleeper", 1.5: "Driving", 0.5: "ON Duty",4.5:"yardmove",5.5:"personalduty"};
 var result = [];
 var tTime = 0;
Template.un_authorize_driver.onRendered(function () {
    if(document.getElementById("totalTime")){
    document.getElementById("totalTime").innerHTML = tTime;
    }
})

Template.un_authorize_driver.helpers({
    slots: function ()
    {
       
        setUnidentifData();
        return result;
    }
})


Template.un_authorize_driver.events({
    "click [claim]": function(evt) {
        for(var i=0;i<result.length;i++){
            var box = document.getElementById(result[i].id);
             if(box.checked){ 
           var start =  getNumFromTime(document.getElementById('in1'+result[i].id).value);
           var end =  getNumFromTime(document.getElementById('in2'+result[i].id).value); 
           var event = Events.find({_id:result[i].id}).fetch()[0];
         //  alert(start+'  '+end)
           console.log(event);
           addEvents(event,start);
            addEvents(event,end);
            addData(start,end,event)
        }
        }
        setUnidentifData();
       
       console.log(  Events.find({}).fetch());

    }
})

Template.un_authorize_driver.events({
    "click #not_my_activity": function(evt) {
       
         history.back();
    }
});

function setUnidentifData(){
    result = [];
    tTime = 0;
    var dataRec = Events.find({userId:'0'},{sort:{start_time:1}}).fetch();
       console.log(dataRec);
       console.log(Data.find({}).fetch())
        for(var i = 0;i<dataRec.length-1;i++){
//            if(dataRec[i].userId !== '0'){
//                continue;
//            }
        //    alert(dataRec[i].userId);
            var val = {};
            val.id = dataRec[i]._id;
           var status  = "";
        
         if(dataRec[i].type == 1){
           var code = 4.5-dataRec[i].code;
           status = statusMap[code];
          // alert(status);
        }
        else if(dataRec[i].type == 3){
            var code = 3.5+dataRec[i].code;
              status = statusMap[code];
        }
             val.status =  status;
            val.start_time = changeNumToTime(dataRec[i].start_time);
            val.range = changeNumToTime(dataRec[i].start_time)+'-'+changeNumToTime(dataRec[i+1].start_time);
            val.date = dataRec[i].date;
            val.end_time = changeNumToTime(dataRec[i+1].start_time);
            tTime = tTime+(dataRec[i+1].start_time-dataRec[i].start_time)
            result.push(val);
            i++;
        }
      //  alert( tTime);
    tTime = changeNumToTime(tTime);
    if(document.getElementById("totalTime")){
    document.getElementById("totalTime").innerHTML = tTime;
    }
}


function addEvents(event,start){
     var lastrecord = Events.find({sort:{seqId:1}}).fetch();
   // console.log(lastrecord);
    var lastId = 0;
    if(lastrecord.length>0){
        lastId = lastrecord[lastrecord.length-1].seqId+1;
    }
   
    var eve = Events.find({start_time:start,date:event.date,userId:'0'}).fetch();
    console.log(eve);
    for(var i = 0;i<eve.length;i++){
       
    var eve1 = eve[i];
    //eve1.recordStatus = 2
    alert(eve1._id);
//    Events.update(
//                {_id: eve._id},
//                eve
//)
     Events.remove({_id: eve1._id});

    }
  //  Events.remove({start_time:start,date:event.date});
     // alert('in1'+result[i].id);
    var newEvent = {};
    newEvent.code         = event.code        
    newEvent.comment      = event.comment      
    newEvent.date         = event.date         
    newEvent.engineHour  = event.engineHour  
    newEvent.latitude   = event.latitude   
    newEvent.location    = event.location    
    newEvent.longitude   = event.longitude   
    newEvent.modified    = event.modified    
    newEvent.recordOrigin = event.recordOrigin 
    newEvent.recordStatus = event.recordStatus 
    newEvent.seqId        = lastId        
    newEvent.start_time   = start   
    newEvent.status       = event.status       
    newEvent.time        = event.time        
    newEvent.eventType         = event.eventType         
    newEvent.updateDate   = event.updateDate   
    newEvent.userId       = Meteor.userId();       
    newEvent.vehicleMiles = event.vehicleMiles 
    newEvent.vehicleStatus= event.vehicleStatus
    newEvent.distanceSinceLastValidCoodinates = event.distanceSinceLastValidCoodinates
    Events.insert(newEvent);
    
}

function addData(start,end,event){
   
            var todaysData = Data.findOne({DateOFDataSaving: event.date,userId:'0'});
   if(todaysData){
                 var data  = JSON.parse(todaysData.Details);
                 var newData = [];
                 var usersData = Data.findOne({DateOFDataSaving: event.date,userId:Meteor.userId()});
                 if(usersData){
                     newData = JSON.parse(usersData.Details);
                 }
                 var remainigData = [];
                 for(var i =0;i<data.length;i++){
                     
                     if(data[i].x>=start && data[i].x<=end){
                         if(i>0){
                             newData.push({x:data[i].x,y:data[i-1].y});
                         }
                         newData.push(data[i]);
                     }
                     else {
                         remainigData.push(data[i]);
                     }
                 }
                 
            for (var i = 0; i < newData.length; i++) { //Number of passes
        for (var j = 0; j < (newData.length - i - 1); j++) { //Notice that j < (length - i)
            //Compare the adjacent positions
            if (newData[j].x > newData[j + 1].x) {
                //Swap the numbers
                var tmp = newData[j];  //Temporary variable to hold the current number
                newData[j] = newData[j + 1]; //Replace current number with adjacent number
                newData[j + 1] = tmp; //Replace adjacent number with current number
            }
        }
    } 
    var jsonRdata = JSON.stringify(remainigData);
    Data.remove({_id:todaysData._id})
    Data.insert({Details: jsonRdata, Location: [],EmployeeTimeSheet: [], DateOFDataSaving: event.date,Events:[],DayCount:0,userId:'0'});
  console.log(usersData);
        if(usersData){
         jsonRdata = JSON.stringify(newData);
     Data.remove({_id:usersData._id})
   
    Data.insert({Details: jsonRdata, Location: usersData.Location,EmployeeTimeSheet:calculateEmployeeSheet(newData), DateOFDataSaving: event.date,Events:usersData.Events,DayCount:usersData.DaysCount,userId:usersData.userId});
    }
    else{
        alert('');
          Data.insert({Details: jsonRdata, Location: [],EmployeeTimeSheet:calculateEmployeeSheet(newData), DateOFDataSaving: event.date,Events:[],DayCount:0,userId:Meteor.userId()});
  
    }
  }
}

function calculateEmployeeSheet(dataset){
    var jsonData = {};
    jsonData[3.5] = 0;
    jsonData[0.5] = 0;
    jsonData[1.5] = 0;
    jsonData[2.5] = 0;
    var contDriveTime = 0;
    var contBreakTime = 0;
    var isContDrive = false;
    var isDutyStarted = false;
   
    var dutyStarttime  = -1;
    var last_change = 0;
   
  
   var lastTime = 0;
    
    for (i = 0; i < dataset.length ; i++) {
        if (i == dataset.length - 1) {
            //jsonData[dataset[i].y] = jsonData[dataset[i].y] + 1;
             if(dataset[i].y == 1.5 || dataset[i].y == 0.5){
            lastTime = dataset[i].x;
        }
            jsonData[dataset[i].y] = jsonData[dataset[i].y]+dataset[i].x-last_change;
            break;
        } else if (dataset[i].x == dataset[i + 1].x) {

        } else {
           
        }
        if(dataset[i].y == 1.5 || dataset[i].y == 0.5){
            if(!isDutyStarted){
                dutyStarttime = dataset[i].x;
                isDutyStarted = true;
            }
            else if(dataset[i].x>dutyStarttime+14){
                isForteenHourViolation = true;
            }
            lastTime = dataset[i].x;
        }
      
        //chcek continue driving voilence 
        
      
         if (dataset[i].y != dataset[i + 1].y) {
		      jsonData[dataset[i].y] = jsonData[dataset[i].y]+dataset[i].x-last_change;	
                     last_change = dataset[i].x;
          }
         
        }

    
    var json = {"OFF": jsonData[3.5], "ON": jsonData[0.5], "Sleeper": jsonData[2.5], Driving: jsonData[1.5]};
 return json;
}

function changeNumToTime(num) {
     
  if ((num + '').includes(".")) {
      
        var decPart = ((num + "").split(".")[1]);
        var dec1 = "."+decPart;
        
        dec1 = Number(dec1)*0.6 ;
        dec1 = (dec1+"").replace('0.','');
        while ((dec1 + '').length < 2) {
            dec1 =  dec1 +'0'
        }
        dec1 = dec1.substr(0, 2) + '.' + dec1.substr(2);
        dec1 = Math.round(dec1);
        while ((dec1 + '').length < 2) {
            dec1 = '0' + dec1
        }
        var intPart = parseInt((num + "").split(".")[0]);
         num =  ( intPart+":"+ dec1);
    }
    else {
        num = num + ':00';
    }
    return num;
}

function getNumFromTime(str){
     var current_value = str;
     if ((str + '').includes(":")) {
        var y = ((str + "").split(":")[1]);
        var x = parseInt((str + "").split(":")[0]);
    
        
      y = parseInt(y / 0.6);
    while ((y + '').length < 2) {
        y = '0' + y;
    }
    //console.log("after" + y);
    if(y != '00'){
     current_value = x + '.' + y;
         }
         else{
             current_value = x; 
         }
     }
     return Number(current_value);
}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


