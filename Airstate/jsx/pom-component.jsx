var PointOfMeasureComponent = React.createClass({

    getInitialState: function(){
       return {
         currentData: Object,
       }
    },
    componentWillMount: function () {
        var m = new Measurements();
        var c = m.getCurrent(this.props.station);
        var temp =  c["temp"].toString();
        var tempPre = temp.substring(0,temp.indexOf("."));
        var tempPost = temp.substring(temp.indexOf(".")+1);
        var tempMax = m.getMaxTemp(this.props.station);
        var tempMin = m.getMinTemp(this.props.station);
        var hum =   c["hum"].toFixed(0).toString();
       
        this.setState({ currentTempPre: tempPre,
                        currentTempPost: tempPost,
                        currentHum: hum,
                        displayTempPre: 0,
                        displayTempPost: 0,
                        displayTempMax: tempMax,
                        displayTempMin: tempMin,
                        displayHum: 0,
                        defaultView: true
                    });
    },
    componentDidMount : function(){
        this.countUp();
    },
    getDefaultProps: function () {
        return {
            station: ''
        }
    },
    render: function () {
        return (
            <div className="col-xs-6 col-sm-3 thermometer">
                <div className="de">
                    <div className="den">
                      <div className="dene">
                        <div className="denem">
                          <div className="denemee">{this.props.station}</div>
                          <div className="deneme" onClick={this.handleClick}>
                                { this.state.defaultView ?
                                    <div>  
                                        <div className="value">
                                            <span className="big" id="currentTempPre">{this.state.currentTempPre}</span>
                                            <span className="post">.</span>
                                            <span className="post" id="currentTempPost">{this.state.currentTempPost}</span>
                                            <span className="unit">&nbsp;&deg;C</span>
                                        </div>
                                        <div className="denemen">
                                          <span id="currentHum">{this.state.displayHum}</span><span> %</span>
                                        </div>
                                    </div>
                               : <div className="small">
                                    <div>max:&nbsp;<b>{this.state.displayTempMax}°C</b>&nbsp;12:23</div>
                                    <div>min:&nbsp;<b>{this.state.displayTempMin}</b>°C&nbsp;2:23</div>
                               </div> }
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
	},
    countUp: function(){
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
         }, 500);
    },
    handleClick: function(event) {
        this.setState({defaultView : !this.state.defaultView});
        if (this.state.defaultView){
            this.setState({displayHum: this.state.currentHum});
            this.setState({displayTempPre: this.state.currentTempPre});
            this.setState({displayTempPost: this.state.currentTempPost});
        }
    },
});