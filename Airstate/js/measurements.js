var restUrl;
var data;


var Measurements = function(){
    return{
        getCurrent : Measurements.prototype.getCurrent,
        getMeasurementsByStation : Measurements.prototype.getMeasurementsByStation,
        getMeasurements : Measurements.prototype.getMeasurements,
        getPeakTemp : Measurements.prototype.getPeakTemp,
        getPoms : Measurements.prototype.getPoms 
    }
};

Measurements.prototype.getPoms = function(){
    return new Promise(
      function(resolve, reject){
        restUrl = "https://airstate.firebaseio.com/measurements/.json?shallow=true";
          $.get(restUrl, function(data) {
            resolve(data);
          });
      }
    );
};

Measurements.prototype.getMeasurements = function(){
    return new Promise(
      function(resolve, reject){
        restUrl = "https://airstate.firebaseio.com/measurements.json";
          $.get(restUrl, function(data) {
            resolve(data);
          });
      }
    );
};

Measurements.prototype.getCurrent = function(station){
    return new Promise(
      function(resolve, reject){
          var restDay = new Date().yyyymmdd();
          var restUrl = "https://airstate.firebaseio.com/measurements/"+station+ "/" + restDay + ".json";
          $.get(restUrl, function(data) {
                var lastKey = Object.keys(data).sort().reverse()[0];
                var lastValue = data[lastKey];
                if (lastValue.temp.toString().indexOf(".") < 0){
                    lastValue.temp +=".00";
                }
                console.log("returning value: " + lastValue.temp);
                resolve(lastValue);     
          }.bind(this));
      }  
    );
  };

Measurements.prototype.getPeakTemp = function(station){
    return new Promise(
      function(resolve, reject){
      var peakTemp = {
        "max":{"val":-99,"time":"00:00"},
        "min":{"val":99,"time":"00:00"}
        }
        var restDay = new Date().yyyymmdd();
        restUrl = "https://airstate.firebaseio.com/measurements/"+station+ "/" + restDay + ".json";
        $.get(restUrl, function(data) {
            for(var key in data){
                if(data.hasOwnProperty(key)) {
                  if (peakTemp.max.val < data[key].temp){
                      peakTemp.max.val = data[key].temp;
                      peakTemp.max.time = moment(data[key].datetime).format("H:mm");
                  }
                  if (peakTemp.min.val > data[key].temp){
                      peakTemp.min.val = data[key].temp;
                      peakTemp.min.time = moment(data[key].datetime).format("H:mm");
                  }
                }
            }
            resolve(peakTemp);
       }.bind(this));
      }
    );
}
