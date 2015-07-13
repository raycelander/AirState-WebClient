var restUrl;
var data;

var Measurements = function(){
    return{
        getCurrent : Measurements.prototype.getCurrent,
        getMeasurementsByStation : Measurements.prototype.getMeasurementsByStation,
        getMeasurements : Measurements.prototype.getMeasurements,
        getMaxTemp : Measurements.prototype.getMaxTemp,
        getMinTemp : Measurements.prototype.getMinTemp
    }
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

Measurements.prototype.getCurrent = function(station){
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

Measurements.prototype.getMaxTemp = function(station){
    return "20.2";
}

Measurements.prototype.getMinTemp = function(station){
    return "2.4";
}
