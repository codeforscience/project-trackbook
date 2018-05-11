var html = require('choo/html')
var raw = require('choo/html/raw')

var TITLE = 'project trackbook'

module.exports = view

function view (state, emit) {
  // if (!state.loaded) return renderLoading(state, emit)

  switch (state.status) {
    case state.statuses.FILES_READY:
      const files = state.files.map(filename => `<li>${filename}</li>`).join('')
      return html`
      <body>
        <main>
          <ul>
            ${raw(files)}
          </ul>
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
