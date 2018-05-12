var html = require('choo/html')

module.exports = historyView

function historyView (state, emit) {
  if (!state.history.length) return html`<div>No Version History</div>`
  return html`
    <div>
      <ul class="list">
      ${state.history.map(function (item) {
        return html`<li>${item.type.toUpperCase()}: ${item.path}</li>`
      })}
      </ul>
    </div>
  `
}
