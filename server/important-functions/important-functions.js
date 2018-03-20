getDate = function getDate() {
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

return mm.toString()+dd.toString()+yyyy.toString();
}

getTime = function getTime() {
var today = new Date(),
  h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
			return h+m+s
}

 function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }
