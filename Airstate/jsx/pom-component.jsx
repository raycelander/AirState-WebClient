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
    componentWillReceiveProps: function () {
        this.updateData();
    }, 
    getDefaultProps: function () {
        return {
            station: ''
        }
    },
    render: function () {
        return (
		    <div className="col-xs-6 col-sm-3 pom-component">
				<div className="full-circle" onClick={this.handleClick}>
				{ this.state.defaultView ?
				<div>
					<div className="inner">
						<img src="svg/sunny.svg" className="weather-pictogram"/>
					    <span id={'currentTempPre'+this.props.station}>{this.state.currentTempPre}</span>
                        <span>.</span>
                        <span id={'currentTempPost'+this.props.station}>{this.state.currentTempPost}</span>
                        <span>&nbsp;&deg;C</span>
					</div>
					<div className="inner smallfont">
					  <span id={'currentHum'+this.props.station}>{this.state.displayHum}</span><span> %</span>
					</div>
					</div>
				: <div className="inner normal-line">
					<div className="smallfont">{this.state.displayTempMax.time}</div>
				    <div>{this.state.displayTempMax.val}°</div>
					<hr />
				    <div>{this.state.displayTempMin.val}°</div>
					<div className="smallfont">{this.state.displayTempMin.time}</div>
				  </div> }
				  </div>
				  <div className="pom-title">{this.props.station}</div>
			</div>
        );
    },
	updateData: function(){
        var app = this;
		var pom = this.props.station;
        new Measurements().getCurrent(this.props.station).then(function(result){

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
        var currentTempPreCounter = new CountUp("currentTempPre"+this.props.station, 0, parseInt(this.state.currentTempPre), 0, 1.5, options);
        var currentTempPostCounter = new CountUp("currentTempPost"+this.props.station, 0, parseInt(this.state.currentTempPost), 0, 1.5, options);
        var currentHumCounter = new CountUp("currentHum"+this.props.station, 0, parseInt(this.state.currentHum), 0, 1.5, options);
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