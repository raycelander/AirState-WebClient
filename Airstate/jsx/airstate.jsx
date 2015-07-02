  var AirState = React.createClass({
          render: function(){
          return (
            <div className="airstate container">
              <div className="row">
                <div className="col-md-1">
                      <img src="svg/airstate_full.svg" width="300" />
                 </div>
              </div>
              <div className="row">
          			<PointOfMeasureComponent station="Aussen" />
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
        }
      });
      
React.render(<AirState/>, document.getElementById('airstate'));
