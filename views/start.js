var html = require('choo/html')

var TITLE = 'project trackbook'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
      <main class="pa3 cf center">
        <h1 class="headline">Project Trackbook</a>
        <section class="fl mw6 w-50-ns pa3">

        </section>
      </main>
    </body>
  `

  function selectArchive () {
    emit('archive:add', 1)
  }
}
