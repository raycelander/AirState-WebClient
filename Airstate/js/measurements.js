var restUrl;
var data;
var max = {"temp": -99,"time":"00:00"} ;
var min = {"temp": 99,"time":"00:00"} ;

var Measurements = function(){
    return{
        getCurrent : Measurements.prototype.getCurrent,
        getMeasurementsByStation : Measurements.prototype.getMeasurementsByStation,
        getMeasurements : Measurements.prototype.getMeasurements,
        getMaxTemp : Measurements.prototype.getMaxTemp,
        getMinTemp : Measurements.prototype.getMinTemp,
        readMinMax : Measurements.prototype.readMinMax,
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
    if (max.temp == -99){
        this.readMinMax(station);
    }
    return max;
}

Measurements.prototype.getMinTemp = function(station){
    if (min.temp == 99){
        this.readMinMax(station);
    }
    return min;
}

Measurements.prototype.readMinMax = function(station){
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
    for(var key in data){
        if(data.hasOwnProperty(key)) {
          if (max.temp < data[key].temp){
              max.temp = data[key].temp;
              max.time = moment(data[key].datetime).format("H:mm");
          }
          if (min.temp > data[key].temp){
              min.temp = data[key].temp;
              min.time = moment(data[key].datetime).format("H:mm");
          }
        }
   }
}
