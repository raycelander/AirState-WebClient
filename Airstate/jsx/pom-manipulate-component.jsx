var m;

var PomManipulator = React.createClass({

    getInitialState: function(){
       return {
         data: {temp:0,hum:0,date:"-",time:"-"},
       };
    },
    componentWillMount: function () {
        m = new Measurement();
    },
    render: function () {
        return (
		<div>
			<h3>Pom Manipulation</h3>
            <div>
    			Pom: <input type="text" id="pom"></input>
    			Record: <input type="text" id="rec"></input>
            </div>
            <button onClick={this.getRecord}>Get record</button>
            <h3>Record from Firebase</h3>
            <div> 
                { this.state.data.date }@{ this.state.data.time }: Humidity: { this.state.data.hum }%, Temperature: { this.state.data.temp }°C 
            </div>
            <input type="text" value={this.state.data.temp} onChange={this.saveTemp}></input>
            <button onClick={this.saveRecord}>Save record</button>
		</div>);
    },
    getRecord: function(e){
          var d = m.read(document.getElementById("pom").value,document.getElementById("rec").value);
          this.setState({ data: d });
    },
    saveRecord: function(e){
          m.save();
    },
    saveTemp: function(e){
        
        /* 
          beide state-statements werden benötigt, damit die textbox entsperrt wird. 
        */
          this.state.data.temp = e.target.value;
          this.setState({ data: this.state.data });
          
          m.save();
          
    }
});