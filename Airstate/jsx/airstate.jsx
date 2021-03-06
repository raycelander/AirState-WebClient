  var isValidPullDown = false;
  var pullDownStartPos = 0;
  var AirState = React.createClass({
      componentWillMount: function () {
          this.updateData();
      },
      componentWillReceiveProps: function () {
        console.log("main props received");
        this.updateData();
      },
      render: function(){
    
        return (
        <div className="airstate container" onTouchEnd={this.onTouchEnd} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove}>
          <div className="row pulldown" ref="pulldown"></div>
          <div className="row">
            <div className="col-md-1 header">
                  <img src="svg/airstate_full.svg" height="86" />
             </div>
          </div>
          <div className="row">
             {this.state.stations}
          </div>      
          <div className="row">	
            <div className="col-md-12">
              <HighchartsBar measurement="temp" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <HighchartsBar measurement="hum" />
            </div>
          </div>
           <div className="row">
            <div className="col-md-12">
              <HighchartsBar measurement="hpa" />
            </div>
          </div>
        </div>
      );
    },
    updateData: function(){
        this.setState({ currentTempPre: 0,
            stations: []
          });
            
          var app = this;
          var p = new Measurements().getPoms().then(function(result){
            var poms = [];
            Object.keys(result).map(function(k){
              poms.push(<PointOfMeasureComponent station={k} />);
            });
            app.setState({ 
              stations: poms,
            });
          });
    },
    handleTouchStart: function(event) {
        isValidPullDown = window.scrollY == 0;
        pullDownStartPos = event.touches[0].clientY;
    },
    handleTouchMove: function(event) {
      if (isValidPullDown){
        this.refs.pulldown.getDOMNode().style.height = event.touches[0].clientY - pullDownStartPos + "px";
        if (event.touches[0].clientY - pullDownStartPos > 40){
          this.refs.pulldown.getDOMNode().innerText = "release to refresh";
        }else{
          this.refs.pulldown.getDOMNode().innerText = "";
        }
      }
    },
    onTouchEnd: function(event) {
      this.refs.pulldown.getDOMNode().innerText = "";
      if (event.changedTouches[0].clientY - pullDownStartPos < 40){
        this.refs.pulldown.getDOMNode().style.height = "0px";
        isValidPullDown = false;
        return;
      }
      
      if (isValidPullDown){
        this.refs.pulldown.getDOMNode().style.height = "0px";
        React.render(<AirState/>, document.getElementById('airstate'));
      }
    },
  });
React.initializeTouchEvents(true);
React.render(<AirState/>, document.getElementById('airstate'));
