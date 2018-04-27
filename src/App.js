import React, { Component } from 'react';
import cronstrue from 'cronstrue';

class App extends Component {
  state = { value: "* * * * *", explanation: "", isValid: true };
  inputRef;

  lastCaretPosition = 0;

  onCaretPositionChange() {
    if (!this.inputRef) {
      return;
    }
    let caretPosition = this.inputRef.selectionStart;
    if (this.lastCaretPosition === caretPosition) {
      return;
    }
    this.lastCaretPosition = caretPosition;
    console.log("caret pos", caretPosition);
  }

  render() {
    return (
      <div>
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
               onChange={e => {
                 let explanation;
                 let isValid = true;

                 let segments = e.target.value.split(" ").filter(_ => _);
                 if (segments.length !== 5) {
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

        <div>
          {this.state.explanation}
        </div>

      </div>
    );
  }
}

export default App;
