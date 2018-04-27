const commonValueHint = [
  ["*", "any value"],
  [",", "value list separator"],
  ["-", "range of values"],
  ["/", "step values"],
];

let valueHints = [
  [...commonValueHint, ["0-59", "allowed values"]],
  [...commonValueHint, ["0-23", "allowed values"]],
  [...commonValueHint, ["1-31", "allowed values"]],
  [...commonValueHint, ["1-12", "allowed values"], ["JAN-DEC", "allowed values"]],
  [...commonValueHint, ["0-6", "allowed values"], ["SUN-SAT", "allowed values"]],
];
valueHints[-1] = [...commonValueHint];
export default valueHints;