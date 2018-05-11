var html = require('choo/html')
var raw = require('choo/html/raw')
var pretty = require('prettier-bytes')
var relative = require('relative-date')

module.exports = view

function view (state, emit) {
  // if (!state.loaded) return renderLoading(state, emit)
  switch (state.status) {
    case state.statuses.FILES_READY:
      const files = state.files.map(stats =>
        `<tr>
          <td class=${stats.isDirectory ? "folder": "file"}> ${stats.name}</td>
          <td>${pretty(stats.size)}</td>
          <td>${relative(stats.mtime)}</td>
        </tr>`
      ).join('')

      const table = `
        <table>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Time</th>
          </tr>
          ${files}
        </table>
      `
      return html`
        <section>
            ${raw(table)}
        </section>
      `
    default:
      emit(state.events.FILES_REQUESTED)
      return html`
        <p>Loading...</p>
      `
  }
}
