
var statusMap = {3.5: "Off Duty", 2.5: "Sleeper", 1.5: "Driving", 0.5: "ON Duty",4.5:"yardmove",5.5:"personalduty"};
 var result = [];
 var latestStaus = 1.5;
 var lastVaue = 0;
 var dataset = [];
 var eventDataset = [];
var vehicle_miles = 10000;
var engine_hours= 777;
var cmv_vin= 'qwert21324';
var engine_status=1;

Template.Warn_Unauthorizer.onRendered(function () {
     var _today = getTodayDate();
                //alert(_today);
Blaze._globalHelpers.callLocation();
                var todaysData = Data.findOne({DateOFDataSaving: _today,userId:'0'});
                if(todaysData){
                var temp = JSON.parse(todaysData.Details);
                if(temp.length>0){
                    dataset = temp;
             
                }}
             updateTimer();
})

Template.Warn_Unauthorizer.onDestroyed(function () {
  // deregister from some central store
  
  updateTimer();
    saveData();
});

function updateTimer() {
  Blaze._globalHelpers.callLocation();

 
    var current_value =getCurrentTimeValue();
  
   
   
    updateGraph(Number(current_value), Number(lastVaue), latestStaus);
  
    addEvent(Number(current_value),Number(current_value),Number(current_value),Blaze._globalHelpers.getLocationString(),latestStaus,'auto',1,1,0);
  
    // eventDataset.push({time: current_value, start_time: current_value,end_time:current_value,location:address,status:statusMap[orignalStatus],origin:'driver',notes:document.getElementById('NotesEdit').innerHTML});

    lastVaue = current_value;
   /// saveData();
    
    console.log(Data.find({}).fetch());
    console.log(Events.find({date:getTodayDate(),userId:'0'}).fetch());
}

function addEvent(timeValue,startTimeValue,endTimeValue,location,status,origenValue,eventTypeValue,eventRecordOriginValue,modified){
    var tempEventDataset = [];
    var dataEventDataset = Events.find({date:getTodayDate(),userId:'0'}).fetch();

    for(var j =0 ;j<dataEventDataset.length;j++){
        if(dataEventDataset[j].start_time === startTimeValue ){
            // eventDataset[j].recordStatus = 2
            // return;
            //Events.remove({_id:dataEventDataset[j]._id});
        }
        else if(dataEventDataset[j].start_time>= startTimeValue && dataEventDataset[j].start_time<=endTimeValue){
            // Events.remove({_id:dataEventDataset[j]._id});
           // eventDataset[j].recordStatus = 2 
            //return;
           //tempEventDataset.push(eventDataset[j]);  
        }
        else{
          tempEventDataset.push(eventDataset[j]);  
        }
       
    }
    if(eventDataset.length>0){
          if(eventDataset[0].start_time === startTimeValue ){
           eventDataset = [];
           return;
        }
        else if(eventDataset[0].start_time>= startTimeValue && eventDataset[0].start_time<=endTimeValue){
          eventDataset = [];
          return;
        }
    }
    
    
        // eventDataset = tempEventDataset;
         //alert(eventDataset.length);
         var event = {};
         event.start_time = startTimeValue;
         event.time = timeValue;
         if(status == 4.5 || status == 5.5){
         event.eventType = 3;
            }
        else {
          event.eventType = eventTypeValue;  
        }
        if(event.eventType == 1){
           event.eventCode = 4.5-status;
          // alert(status);
        }
        else if(event.eventType == 3){
            event.eventCode = status-3.5;
        }
        else if(event.eventType == 2){
            event.eventCode = 1;
        }
        
        event.status = status;
        event.recordStatus = 1;
        event.recordOrigin = eventRecordOriginValue;
        event.vehicleStatus = engine_status;
        event.vehicleMiles = vehicle_miles
        event.engineHour = engine_hours;
        event.latitude = Blaze._globalHelpers.getLatitude();
        event.longitude = Blaze._globalHelpers.getLongitude();
        event.location  = location;
        event.comment = 'un auth';
        event.userId = '0';
        event.modified = modified;
        event.updateDate = localDateTime(Session.get("companyLocationOffset"));
        eventDataset.push(event);
    
}

function updateGraph(max,min,s){
     var isStart = false;
    var tempDataset = dataset
    //dataset= [];
    stripes = [];
    var newArray = [];
    var arrR = [];
    var isSecond = false;
    var isFirst = false;


    for (i = 0; i < dataset.length; i++) {
             if(i<dataset.length-1 && dataset[i+1].x>=min && !isFirst ){
              //alert(dataset[i].y);
              newArray.push({x: min, y: dataset[i].y});
                    isFirst = true;
             }

        if (dataset[i].x <= max && dataset[i].x >= min) {
            
            
          if(i == dataset.length-1){
                newArray.push({x: max, y: s})
               // newArray.push(dataset[i])
         }
        }
        //console.log(i);

        else {
        if( !isSecond && dataset[i].x >= max){
            
            newArray.push({x: max, y: s})
            newArray.push({x: max, y: dataset[i].y});
            isSecond = true;
        }
        newArray.push(dataset[i])
//        else
             
            //console.log(dataset[i])
        }
        
    }
    
     // console.log(newArray);
    dataset = newArray;
      tempDataset = dataset;
      var len = dataset.length-1;
      
     dataset.push({x: min, y: s})
  
 for (var i = 0; i < dataset.length; i++) { //Number of passes
        for (var j = 0; j < (dataset.length - i - 1); j++) { //Notice that j < (length - i)
            //Compare the adjacent positions
            if (dataset[j].x > dataset[j + 1].x) {
                //Swap the numbers
                var tmp = dataset[j];  //Temporary variable to hold the current number
                dataset[j] = dataset[j + 1]; //Replace current number with adjacent number
                dataset[j + 1] = tmp; //Replace adjacent number with current number
            }
        }
    }


}
function saveData() {
    sortEvent();
     var _today =getTodayDate();
  
   var dataset1 = JSON.stringify(dataset);
    if (Data.find({DateOFDataSaving: _today,userId:'0'}, {Details: 0, _id: 0}).count() == 0)
    {
       // alert("In if block.");
        Data.insert({Details: dataset1, Location: [],EmployeeTimeSheet: [], DateOFDataSaving: _today,Events:eventDataset,DayCount:0,userId:'0'});
    } else
    {
       // alert("In else block.");

        var obj = Data.findOne({DateOFDataSaving: _today,userId:'0'}, {Details: 0, EmployeeTimeSheet: 0, DateOFDataSaving: 0});

        var ID = obj._id;

       // console.log(ID);
        Data.update(
                {_id: ID},
                {
                    Details: dataset1,
                    EmployeeTimeSheet: [],
                    //DateOFDataSaving: "Friday, June 16, 2017"
					Location: [],
                    DateOFDataSaving: _today,
                    Events:eventDataset,
                    DayCount:0,
                    userId:'0'
                }
        )
    }
       addEventIntoDB();
       eventDataset = [];
	//console.log(Events);
}

function getTodayDate(){
    var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
    var today2 = localDateTime(Session.get("companyLocationOffset"));
    var _today = today2.toLocaleDateString("en-US", dateFormat);
    return _today;
}

function getCurrentTimeValue(){
    var minutes = 1000 * 60;
    var hours = minutes * 60;
    var d = localDateTime(Session.get("companyLocationOffset"));
    var t = d.getTime();
    var x = d.getHours();
    var y = d.getMinutes();
            //console.log("prevoius" + y);
    y = parseInt(y / 0.6);
    while ((y + '').length < 2) {
        y = '0' + y;
    }
    //console.log("after" + y);

    var current_value = x + '.' + y;
    return current_value;
}

function sortEvent(){
      for (var i = 0; i < eventDataset.length; i++) { //Number of passes
        for (var j = 0; j < (eventDataset.length - i - 1); j++) { //Notice that j < (length - i)
            //Compare the adjacent positions
            
            if ( eventDataset[j].start_time > eventDataset[j + 1].start_time) {
                //Swap the numbers
               
                var tmp = eventDataset[j];  //Temporary variable to hold the current number
                eventDataset[j] = eventDataset[j + 1]; //Replace current number with adjacent number
                eventDataset[j + 1] = tmp; //Replace adjacent number with current number
            }
        }
    }
}

function addEventIntoDB(){
  
    var lastrecord = Events.find({sort:{seqId:1}}).fetch();
   // console.log(lastrecord);
    var lastId = 0;
    if(lastrecord.length>0){
        lastId = lastrecord[lastrecord.length-1].seqId+1;
    }
   
  for (var i = 0; i < eventDataset.length; i++) {
      var eve = Events.find({start_time:eventDataset[i].start_time,date:eventDataset[i].date,userId:'0'}).fetch();
     console.log(eve)
        if(eve.length>0){
       
    eve = eve[0];
    eve.recordStatus = 2

     Events.remove({_id: eve._id});

    }
      eventDataset[i].date = getTodayDate();
     
      eventDataset[i].seqId = lastId+i;
      Events.insert(eventDataset[i]);
  }   
}


Template.Warn_Unauthorizer.events({
    "click #dont_remind": function(evt) {
       updateTimer();
    saveData();
         history.back();
    }
});
Template.Warn_Unauthorizer.events({
    "click #login": function(evt) {
        updateTimer();
    saveData();
         history.back();
    }
});