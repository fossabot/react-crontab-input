import React, { Component } from 'react';
import cronstrue from 'cronstrue';

class App extends Component {
  state = { value: "* * * * *", explanation: "", isValid: true, selectedPartIndex: -1 };
  inputRef;

  lastCaretPosition = -1;

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
    console.log(selectedPartIndex);
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

        <div>
          {this.state.explanation}
        </div>

        <div>
          {this.state.selectedPartIndex}
        </div>

      </div>
    );
  }
}

export default App;
