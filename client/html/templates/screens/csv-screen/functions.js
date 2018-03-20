getLineDataCheck=function getLineDataCheck(str){
if(!str)
return
var sum=doSum(str);
var hex=ConvertDecimalToHex(sum);
var bin=ConvertHexToBinary(hex);
var rearranged=cutFromLeftAppendToRight(bin);
var xor=doXOR(rearranged,"10010110");
var res=ConvertBinaryToHex(xor);
if(res.toString().length==1){
	res="0"+res;
}
return res;
}

getEventDataCheck=function getEventDataCheck(str){
if(!str)
return
var sum=doSum(str);
var hex=ConvertDecimalToHex(sum);
var bin=ConvertHexToBinary(hex);
var rearranged=cutFromLeftAppendToRight(bin);
var xor=doXOR(rearranged,"11000011");
var res=ConvertBinaryToHex(xor);
if(res.toString().length==1){
	res="0"+res;
}
return res;
}

getFileDataCheck=function getFileDataCheck(hex){
if(!hex)
return
//var sum=doSum(str);
//var hex=ConvertDecimalToHex(sum);

//var v1=hex.toString().substring(0, 2)
//var v2=hex.toString().substring(2,4)
//v1=ConvertDecimalToBinary(parseInt(v1))
//v2=ConvertDecimalToBinary(parseInt(v2))
//v1=cutFromLeftAppendToRight(cutFromLeftAppendToRight(cutFromLeftAppendToRight(v1)));
//v2=cutFromLeftAppendToRight(cutFromLeftAppendToRight(cutFromLeftAppendToRight(v2)));
/*var bin=ConvertHexToBinary(hex);
var arr=bin.toString().match(/.{1,8}/g);
 
var rearranged1=0;
if(arr[0])
rearranged1=cutFromLeftAppendToRight(cutFromLeftAppendToRight(cutFromLeftAppendToRight(arr[0])));
var rearranged2=0;
if(arr[1])
rearranged2=cutFromLeftAppendToRight(cutFromLeftAppendToRight(cutFromLeftAppendToRight(arr[1])));
var rearranged=rearranged1+rearranged2
 */

// var rearranged=v1+v2
console.log(hex)
var binary=ConvertDecimalToBinary(parseInt(hex))
console.log(binary);
var arr=binary.toString().match(/.{1,8}/g);
console.log(arr)
var first_0=circularShift(arr[0]);
var first_1=circularShift(arr[1]);

var second_0=circularShift(first_0);
var second_1=circularShift(first_1);

var third_0=circularShift(second_0);
var third_1=circularShift(second_1);

var rearranged=third_0+third_1
//var v1=circularShift(hex)
//console.log(v1)
var xor=doXOR(rearranged,"1001011010011100");
var res=ConvertBinaryToHex(xor);
if(res.toString().length==1){
	res="0"+res;
}
return res;

}


addHex=function addHex(arr) {
if(!arr)
return
var sum=0;
for(var i=0;i<arr.length;i++){
	sum=sum+parseInt(arr[i], 16);
}

  var hexStr =  sum.toString(16);
  while (hexStr.length < 6) { hexStr = '0' + hexStr; } //Zero pad
  return ConvertHexToDecimal(hexStr);
}


clean=function clean(str){
	//var str=str.toString();
if((str==undefined || str==""))
return " "
str=str.toString()
	str = str.replace(/\r?\n|\r/g, ";");
	str = str.replace(/,/g, ";");
	return str
}


getDate=function getDate(d) {
if(d)
var today = new Date(d);
else
var today = localDateTime(Session.get("companyLocationOffset"));
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

 function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

getTime=function getTime() {
var today = localDateTime(Session.get("companyLocationOffset")),
  h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
			return h.toString()+m.toString()+s.toString()
}

function table3_map(a){
if(!a)
return 0
var num_a=parseInt(a)
if(!isNaN(num_a))
	if(num_a>=0 && num_a<=9)
	return num_a
if(!map_obj[a])
return 00;
return map_obj[a]
	
}

function doSum(str){
if(!str)
return
var length=str.length;
var sum=0;
for(var i=0;i<length;i++)
	{
	sum=sum + table3_map(str[i]);
	}
	if(sum==0){
		sum=("0" + sum).slice(-2);
	}
	
return sum;
}

function ConvertDecimalToHex(numberValue){
if(!numberValue)
return
        var decNumber = Number(numberValue);
        var hexNumber = decNumber.toString(16).toUpperCase();
 
        return hexNumber;
      }
	  
function ConvertHexToBinary(hex){
if(!hex)
return
    return ("00000000" + (parseInt(hex, 16)).toString(2)).substr(-8);
}
function ConvertDecimalToBinary(d){
if(!d)
return
var n=d.toString(2)
    return "0000000000000000".substr(n.length)+n;
}
function ConvertHexToDecimal(hex){
if(!hex)
return
    return parseInt(hex,16);
}

function doXOR(n,v){
if(!n)
return
n=n.toString();
	var output=parseInt(v,2) ^ parseInt(n,2)
	return output.toString(2)
}

function ConvertBinaryToHex(binary){
if(!binary)
return
    return parseInt(binary.toString(), 2).toString(16).toUpperCase();
}


function cutFromLeftAppendToRight(n){
if(!n)
return
	var first_three=n.substring(0, 3);
	var remaining=n.substring(3, n.length);
	var new_string=remaining+first_three
	return new_string
	
}

function circularShift(n){
	var first=n.substring(0, 1);
	var remaining=n.substring(1, n.length);
	var new_string=remaining+first
	return new_string
}


validateAlphanumeric=function validateAlphanumeric(n){
return /^([0-9]|[a-z])+([0-9a-z]+)$/i.test(n)
}