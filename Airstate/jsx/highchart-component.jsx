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
  componentDidMount: function() {
        dataSeries = new Array();
        var data = new Measurements().getMeasurements();
        var stations = Object.getOwnPropertyNames(data);
        var measurement = this.props.measurement;
        measurementTitle = measurement == 'temp'?'Temperature':'Humidity';
        format = measurement == 'temp'?'{value} °C':'{value} %';
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
            console.log(data);
            console.log(datas.sort());
            dataSeries.push({
                name:entry,
                type:'spline',
                tooltip: measurement == 'temp'?'°C':'%',
                data: datas
            });
        });
        this.renderChart();
        console.log("rendering chart " + this.props.measurement);
  },
  getDefaultProps: function () {
      return {
          measurement: 'temp'
      }
  },
  render: function() {
      console.log("rendering " + measurementTitle);
    return (
      React.DOM.div({className: "chart", ref: "chartNode"})
    );
  }
});