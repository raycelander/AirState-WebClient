var dataSeries;
var categories = [];
var measurementTitle = 'n/a';
var format;

var HighchartsBar = React.createClass({
  displayName: 'HighchartsBar',
  renderChart: function() {
        var node = this.refs.chartNode.getDOMNode();
        jQuery(function ($) {
            var chart = new Highcharts.Chart({
                chart:{
                    renderTo:node,
                    height:300,
                },
                title: {
                    text: measurementTitle
                },
                xAxis: {
                    type: 'datetime',
                            dateTimeLabelFormats: { 
                            month: '%e. %b',
                            year: '%b'
                        },
                        title: {
                            text: 'Date'
                        }
                },
                yAxis: {
                    labels: {
                        format: format,
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: measurementTitle,
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                },
                series: dataSeries,
            });
        });
  },
  componentWillMount: function () {
     // this.updateData();
  },
  componentWillReceiveProps: function () {
    console.log("chart: props received for " + this.props.measurement);
    this.updateData();
  },

  render: function() {
    return (
      React.DOM.div({className: "chart", ref: "chartNode"})
    );
  },
  updateData: function(){
      console.log("chart: update " + this.props.measurement);
      var app = this;
       new Measurements().getMeasurements().then(function(data){
            dataSeries = new Array();   
            var stations = Object.getOwnPropertyNames(data);
            var measurement = app.props.measurement;
            var unit;
            if (measurement == "temp"){
                measurementTitle = 'Temperatur';
                unit = "°C"
            }else if (measurement == "hum"){
                measurementTitle = 'Luftfeuchtigkeit';
                unit=  "%";
            }else if (measurement == "hpa"){
                measurementTitle = 'Luftdruck';
                unit = "hPa";
            }

            format = "{value} " + unit;    
            var i = 0;
            stations.forEach(function(entry) {
                var datas = [];
                var cat = [];
                Object.keys(data[entry]).map(function(k){
                   	Object.keys(data[entry][k]).map(function(m){
                       var d = Date.parse(data[entry][k][m]["datetime"] + " UTC");
        			     datas.push([d,data[entry][k][m][measurement]]);
            	       });
                });
                datas.sort();
                dataSeries.push({
                    name:entry,
                    type:'spline',
                    tooltip:unit,
                    data: datas
                });
            });
            app.renderChart();
       });
  }
});