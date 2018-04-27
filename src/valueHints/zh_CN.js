const commonValueHint = [
  ["*", "任何值"],
  [",", "取值分隔符"],
  ["-", "范围内的值"],
  ["/", "步长"],
];

let valueHints = [
  [...commonValueHint, ["0-59", "可取的值"]],
  [...commonValueHint, ["0-23", "可取的值"]],
  [...commonValueHint, ["1-31", "可取的值"]],
  [...commonValueHint, ["1-12", "可取的值"], ["JAN-DEC", "可取的值"]],
  [...commonValueHint, ["0-6", "可取的值"], ["SUN-SAT", "可取的值"]],
];
valueHints[-1] = [...commonValueHint];
export default valueHints;