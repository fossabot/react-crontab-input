import React from 'react';
import ReactDOM from 'react-dom';
import CrontabInput from './CrontabInput';

class App extends React.Component {
  state = { value1: "* * * * *", value2: "* * * * *" };

  render() {
    return <div>
      <CrontabInput value={this.state.value1} onChange={value => this.setState({ value1: value })}/>
      <hr style={{ margin: 50 }}/>
      <CrontabInput locale={"zh_CN"} value={this.state.value2} onChange={value => this.setState({ value2: value })}/>
    </div>
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
