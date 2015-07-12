var PointOfMeasureComponent = React.createClass({

    getInitialState: function(){
       return {
         currentData: Object
       }
    },
    componentWillMount: function () {
        var c = new Measurement().getCurrent(this.props.station);
        var temp =  c["temp"].toString();
        var tempPre = temp.substring(0,temp.indexOf("."));
        var tempPost = temp.substring(temp.indexOf(".")+1);
        var hum =   c["hum"];
        this.setState({ currentTempPre: tempPre,
                        currentTempPost: tempPost,
                        currentHum: hum,
                        });
    },
    componentDidMount : function(){
      var options = {
              useEasing : true, 
              useGrouping : true, 
              separator : ',', 
              decimal : '.', 
              prefix : '', 
              suffix : '' 
            };
        var currentTempPreCounter = new CountUp("currentTempPre", 0, this.state.currentTempPre, 0, 1.5, options);
        var currentTempPostCounter = new CountUp("currentTempPost", 0, this.state.currentTempPost, 0, 1.5, options);
        var currentHumCounter = new CountUp("currentHum", 0, this.state.currentHum, 0, 1.5, options);
        var refreshIntervalId = setInterval(function(){ 
            currentTempPreCounter.start();
            currentTempPostCounter.start();
            currentHumCounter.start();
             clearInterval(refreshIntervalId);
         }, 1000);
    },
    getDefaultProps: function () {
        return {
            station: ''
        }
    },
    render: function () {
        var fontStyle = {
          fontSize: '36px'
        };
        var stationStyle={
            fontSize:'24px',
        }

        return (
            <div className="col-xs-6 col-sm-3 thermometer">
                <div className="de">
                    <div className="den">
                      <div className="dene">
                        <div className="denem">
                          <div className="denemee">{this.props.station}</div>
                          <div className="deneme">
                            <span className="big" id="currentTempPre">0</span>.<span className="post" id="currentTempPost">0</span><strong>&deg;</strong>
                            <div className="denemen">
                              <span id="currentHum">0</span><span> %</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        );
    },
	refresh: function(){
		console.log("refreshing");
	}
});