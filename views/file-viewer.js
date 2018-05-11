var html = require('choo/html')

var TITLE = 'project trackbook'

module.exports = view

function view (state, emit) {
  // if (!state.loaded) return renderLoading(state, emit)

  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
      <main class="pa3 cf center">
      FILE RENDERER
      </main>
    </body>
  `
}
