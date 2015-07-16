  var isValidPullDown = false;
  var pullDownStartPos = 0;
  var AirState = React.createClass({
          render: function(){
          return (
            <div className="airstate container" onTouchEnd={this.onTouchEnd} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove}>
              <div className="row pulldown" ref="pulldown"></div>
              <div className="row">
                <div className="col-md-1 header">
                      <img src="svg/airstate_full.svg" width="300" />
                 </div>
              </div>
              <div className="row">
          			<PointOfMeasureComponent station="Aussen"/>
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
            </div>
          );
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
