import React, { Component } from 'react';
import cronstrue from 'cronstrue';
import valueHints from './valueHints';

class App extends Component {
  state = { value: "* * * * *", explanation: "", isValid: true, selectedPartIndex: -1 };
  inputRef;

  lastCaretPosition = -1;

  componentWillMount() {
    this.setState({
      explanation: cronstrue.toString(this.state.value),
    });
  }

  clearCaretPosition() {
    this.lastCaretPosition = -1;
    this.setState({
      selectedPartIndex: -1,
    });
  }

  onCaretPositionChange() {
    if (!this.inputRef) {
      return;
    }
    let caretPosition = this.inputRef.selectionStart;
    if (this.lastCaretPosition === caretPosition) {
      return;
    }
    this.lastCaretPosition = caretPosition;

    let textBeforeCaret = this.state.value.substring(0, caretPosition);
    let selectedPartIndex = textBeforeCaret.split(" ").length - 1;
    this.setState({
      selectedPartIndex,
    });
  }

  render() {
    return (
      <div className="crontab-input">
        <div className="explanation">
          {this.state.explanation}
        </div>

        <input type="text" className="cron-input"
               value={this.state.value}
               ref={ref => {
                 this.inputRef = ref;
               }}
               onMouseUp={e => {
                 this.onCaretPositionChange()
               }}
               onKeyUp={e => {
                 this.onCaretPositionChange()
               }}
               onBlur={e => {
                 this.clearCaretPosition()
               }}
               onChange={e => {
                 let explanation;
                 let isValid = true;

                 let parts = e.target.value.split(" ").filter(_ => _);
                 if (parts.length !== 5) {
                   this.setState({
                     value: e.target.value,
                     explanation: "the expression should have 5 parts",
                     isValid: false,
                   }, this.onCaretPositionChange);
                   return;
                 }

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
                 }, this.onCaretPositionChange);
               }}/>


        <div className="parts">
          {["minute", "hour", "day(month)", "month", "day(week)"].map((unit, index) => (
            <div
              className={"part " + (this.state.selectedPartIndex === index ? "selected" : "")}>{unit}</div>
          ))}
        </div>

        {valueHints[this.state.selectedPartIndex] && <div className="allowed-values">
          {valueHints[this.state.selectedPartIndex].map(value => (
            <div className="value">
              <div className="key">{value[0]}</div>
              <div className="value">{value[1]}</div>
            </div>
          ))}
        </div>}

      </div>
    );
  }
}

export default App;
