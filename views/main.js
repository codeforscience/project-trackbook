var html = require('choo/html')
var renderLoading = require('../components/loading')

var TITLE = 'project trackbook'

module.exports = view

function view (state, emit) {
  // loading
  if (!state.trackbook.loaded) return renderLoading(state, emit)

  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
      <main class="pa3 cf center">
        <section class="fl mw6 w-50-ns pa3">
        (ui stuff)
        </section>
        <section class="fl mw6 w-50-ns pa3">
        (file browser)
        </section>
      </main>
    </body>
  `
}
