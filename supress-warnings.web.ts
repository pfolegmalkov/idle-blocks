const originalConsoleError = window.console.error.bind(window.console);

const patternsToIgnore = [
  'Unknown event handler',
  'ReactDOM.render is no longer',
];

window.console.error = function (...params) {
  const firstParam = params[0];
  if (
    typeof firstParam === 'string' &&
    patternsToIgnore.some((pattern) => firstParam.includes(pattern))
  ) {
    return;
  }
  originalConsoleError(...params);
};
