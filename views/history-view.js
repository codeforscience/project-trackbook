var html = require('choo/html')

module.exports = historyView

function historyView (state, emit) {
  if (!state.history.length) return html`<div>No Version History</div>`
  return html`
    <div>
      <ul class="list">
      ${state.history.map(function (item) {
        var fileInfo = state.fileHistory[item.path]
        console.log(item, )
        return html`<li>${item.path}, Version ${fileInfo.versions} </li>`
      })}
      </ul>
    </div>
  `
}
