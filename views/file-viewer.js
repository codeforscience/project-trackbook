var html = require('choo/html')
var raw = require('choo/html/raw')

var TITLE = 'project trackbook'

module.exports = view

function view (state, emit) {
  // if (!state.loaded) return renderLoading(state, emit)

  switch (state.status) {
    case state.statuses.FILES_READY:
      const files = state.files.map(stats =>
        `<tr>
          <td>${stats.name}</td>
          <td>${stats.size}</td>
          <td>${stats.mtime}</td>
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
        <body>
          <main>
            ${raw(table)}
          </main>
        </body>
      `
    default:
      emit(state.events.FILES_REQUESTED)
      return html`
        <p>Loading...</p>
      `
  }
}
