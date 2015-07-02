var restUrl;
var data;

var Measurements = function(){ };

Measurements.prototype.getMeasurementsByStation = function(station){
    restUrl = "https://airstate.firebaseio.com/measurements/"+station+".json";
    
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

Measurements.prototype.getMeasurements = function(){
    restUrl = "https://airstate.firebaseio.com/measurements.json";
    
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

