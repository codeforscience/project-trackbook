var html = require('choo/html')
var renderLoading = require('../components/loading')
var infoView = require('../components/info-view')
var fileView = require('../views/file-viewer')

var TITLE = 'project trackbook'

module.exports = view

function view (state, emit) {
  // loading
  if (!state.trackbook.loaded) return renderLoading(state, emit)

  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="lh-copy">
      <header class="tc w-100">
        <h1 class="f1 avenir small-caps mv1 tracked">Project TrackBook!</h1>
      </header>
      <main class="pa3 cf center">
        ${infoView(state, emit)}
        <section class="fl mw6 w-50-ns pa3">
        ${fileView(state, emit)}
        </section>
      </main>
    </body>
  `
}
