getTime=function getTime() {
var today = localDateTime(Session.get("companyLocationOffset"))(),
  h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
			return h.toString()+m.toString()+s.toString()
}
getDate=function getDate(d) {
if(d)
var today = new Date(d);
else
var today = localDateTime(Session.get("companyLocationOffset"))();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear()%100;

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

return mm.toString()+dd.toString()+yyyy.toString();
}



getDate=function getDate(d) {
if(d)
var today = new Date(d);
else
var today = localDateTime(Session.get("companyLocationOffset"))();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear()%100;

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

return mm.toString()+dd.toString()+yyyy.toString();
}

dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};


function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }