var restUrl;
var data;

var Measurement = function(){
    return{
        save : Measurement.prototype.save,
        read : Measurement.prototype.read,
        getCurrent : Measurement.prototype.getCurrent,
    }
 };

Measurement.prototype.getCurrent = function(station){
    var restDay = new Date().yyyymmdd();
    restUrl = "https://airstate.firebaseio.com/measurements/"+station+ "/" + restDay + ".json";
    
    var http = new XMLHttpRequest();  
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
              data = JSON.parse(this.responseText);
       }
    };
    http.open("GET", restUrl,false);
    http.send();
    
    var lastKey = Object.keys(data).sort().reverse()[0];
    var lastValue = data[lastKey];
    if (lastValue.temp.toString().indexOf(".") < 0){
        lastValue.temp +=".00";
    }
    return lastValue;
};

/* Obsolete */
Measurement.prototype.read = function(station, id){
    restUrl = "https://airstate.firebaseio.com/measurements/"+station+"/"+id+".json";

    var http = new XMLHttpRequest();  
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
              data = JSON.parse(this.responseText);
       }
    };
    http.open("GET", restUrl,false);
    http.send();
    return data;
};

/* Obsolete */
Measurement.prototype.save = function(){
    var http = new XMLHttpRequest();  
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("data saved");
       }
    };
    http.open("PATCH", restUrl,true);
    http.send(JSON.stringify(data));
};

