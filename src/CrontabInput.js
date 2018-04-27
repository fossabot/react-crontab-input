import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cronstrue from 'cronstrue/i18n';
import Cron from "cron-converter";
import valueHints from './valueHints';
import './crontab-input.css';
import locales from "./locales";
import Highlighter from "react-highlight-words";

class CrontabInput extends Component {
  state = {
    value: "* * * * *",
    explanation: "",
    isValid: true,
    selectedPartIndex: -1,
    nextSchedules: [],
    nextExpanded: false,
    highlightExplanation: "",
    explanationHighlightSegments: [],
  };
  inputRef;

  lastCaretPosition = -1;

  componentWillMount() {
    this.calculateNext();
    this.calculateExplanation();
  }

  clearCaretPosition() {
    this.lastCaretPosition = -1;
    this.setState({
      selectedPartIndex: -1,
      highlightExplanation: "",
    });
  }

  calculateNext() {
    let nextSchedules = [];
    try {
      let cronInstance = new Cron();
      cronInstance.fromString(this.state.value);
      let timePointer = +new Date();
      for (let i = 0; i < 5; i++) {
        let schedule = cronInstance.schedule(timePointer);
        let next = schedule.next();
        nextSchedules.push(next.format("YYYY-MM-DD hh:mm:ss"));
        timePointer = +next + 1000;
      }
    } catch (e) {
    }
    this.setState({ nextSchedules });
  }

  calculateExplanation(callback) {
    let isValid = true;
    let explanation;
    let explanationHighlightSegments = [];
    try {
      let parsed = cronstrue.parse(this.state.value, { locale: this.props.locale });
      explanation = parsed.description;
      explanationHighlightSegments = [
        parsed.timeSegment,
        parsed.timeSegment,
        parsed.dayOfMonthDesc,
        parsed.monthDesc,
        parsed.dayOfWeekDesc,
      ];
    } catch (e) {
      explanation = e.toString();
      isValid = false;
    }
    this.setState({
      explanation: explanation,
      explanationHighlightSegments,
      isValid,
    }, callback || null);
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
      highlightExplanation: this.state.explanationHighlightSegments[selectedPartIndex],
    });
  }

  getLocale() {
    return locales[this.props.locale];
  }

  render() {
    return (
      <div className="crontab-input">
        <div className="explanation">
          <Highlighter
            highlightClassName="highlighted"
            searchWords={[this.state.highlightExplanation]}
            autoEscape={true}
            textToHighlight={this.state.isValid ? `“${this.state.explanation}”` : "　"}
          />
        </div>

        <div className="next">
          {!!this.state.nextSchedules.length && <span>
            {this.getLocale().nextTime}: {this.state.nextSchedules[0]} {this.state.nextExpanded ?
            <a onClick={() => this.setState({ nextExpanded: false })}>({this.getLocale().hide})</a> :
            <a onClick={() => this.setState({ nextExpanded: true })}>({this.getLocale().showMore})</a>}
            {!!this.state.nextExpanded && <div className="next-items">
              {this.state.nextSchedules.slice(1).map((item, index) => <div
                className="next-item" key={index}>{this.getLocale().then}: {item}</div>)}
            </div>}
          </span>}
        </div>

        <input type="text" className={"cron-input " + (!this.state.isValid ? "error" : "")}
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
                 let parts = e.target.value.split(" ").filter(_ => _);
                 if (parts.length !== 5) {
                   this.setState({
                     value: e.target.value,
                     explanation: "",
                     isValid: false,
                   }, this.onCaretPositionChange);
                   return;
                 }
                 this.setState({
                   value: e.target.value,
                 }, () => {
                   this.calculateExplanation(() => {
                     this.onCaretPositionChange();
                     this.calculateNext();
                   });
                 });
               }}/>


        <div className="parts">
          {[
            this.getLocale().minute,
            this.getLocale().hour,
            this.getLocale().dayMonth,
            this.getLocale().month,
            this.getLocale().dayWeek,
          ].map((unit, index) => (
            <div key={index}
                 className={"part " + (this.state.selectedPartIndex === index ? "selected" : "")}>{unit}</div>
          ))}
        </div>

        {valueHints[this.props.locale][this.state.selectedPartIndex] && <div className="allowed-values">
          {valueHints[this.props.locale][this.state.selectedPartIndex].map((value, index) => (
            <div className="value" key={index}>
              <div className="key">{value[0]}</div>
              <div className="value">{value[1]}</div>
            </div>
          ))}
        </div>}

      </div>
    );
  }
}

CrontabInput.propTypes = {
  locale: PropTypes.string,
};

CrontabInput.defaultProps = {
  locale: "en",
};

export default CrontabInput;
