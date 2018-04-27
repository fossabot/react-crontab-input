import React, { Component } from 'react';
import './App.css';
import cronstrue from 'cronstrue';

console.log(cronstrue.toString("0 23 ? * MON-FRI"));

class App extends Component {
  state = { value: "", explanation: "", isValid: true };

  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={e => {
          let explanation;
          let isValid = true;
          try {
            explanation = cronstrue.toString(e.target.value);
          } catch (e) {
            explanation = e.toString();
            isValid = false;
          }
          this.setState({
            value: e.target.value,
            explanation: explanation,
            isValid,
          })
        }}/>

        <div>
          {this.state.explanation}
        </div>

      </div>
    );
  }
}

export default App;
