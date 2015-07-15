var PointOfMeasureComponent = React.createClass({
    getInitialState: function(){
       return {
         currentData: Object,
       }
    },
    componentWillMount: function () {
     this.setState({ currentTempPre: 0,
                currentTempPost: 0,
                currentHum: 0,
                displayTempPre: 0,
                displayTempPost: 0,
                displayTempMax: 0,
                displayTempMin: 0,
                displayHum: 0,
                defaultView: true
            });
      this.updateData();
    },
    componentDidMount : function(){
        //this.countUp();
    },
    componentDidUpdate : function () {
       //this.countUp();
    },
    componentWillReceiveProps: function () {
       //console.log("componentWillReceiveProps");
        this.updateData();
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
                                    <div><b>&nbsp;&#8679;&nbsp;</b>{this.state.displayTempMax.val}°<span>&nbsp;&nbsp;</span><span>{this.state.displayTempMax.time}</span></div>
                                    <div><b>&nbsp;&#8681;&nbsp;</b>{this.state.displayTempMin.val}°<span>&nbsp;&nbsp;</span><span>{this.state.displayTempMin.time}</span></div>
                               </div> }
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        );
    },
	updateData: function(){
        var app = this;
        console.log("getting datas...");
        new Measurements().getCurrent(this.props.station).then(function(result){
            console.log("current datas received: " + result.temp);    
            
            var temp =  result.temp.toString();
            var tempPre = temp.substring(0,temp.indexOf("."));
            var tempPost = temp.substring(temp.indexOf(".")+1);
            var hum =   result.hum.toFixed(0).toString();
           
            app.setState({ currentTempPre: tempPre,
                            currentTempPost: tempPost,
                            currentHum: hum,
                            displayTempPre: 0,
                            displayTempPost: 0,
                            displayHum: 0,
                        });
            app.countUp();
        });
        new Measurements().getPeakTemp(this.props.station).then(function(result){
            console.log("peak datas received: ");
            console.log(result);
               app.setState({ 
                            displayTempMax: result.max,
                            displayTempMin: result.min,
                        });
        });
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