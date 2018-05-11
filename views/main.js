var html = require('choo/html')
var renderLoading = require('../components/loading')
var raw = require('choo/html/raw')

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
        <article class="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
          <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Introduction</h1>
          <div class="pa3 bt b--black-10">
            <p class="f6 f5-ns lh-copy measure" id="introduction">
              ${raw(state.paper.introduction)}
            </p>
          </div>
        </article>
        <article class="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
          <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Methods</h1>
          <div class="pa3 bt b--black-10">
            <p class="f6 f5-ns lh-copy measure">
              ${raw(state.paper.methods)}
            </p>
          </div>
        </article>
        <article class="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
          <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Results</h1>
          <div class="pa3 bt b--black-10">
            <p class="f6 f5-ns lh-copy measure">
              ${raw(state.paper.results)}
            </p>
          </div>
        </article>
        <article class="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
          <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Discussion</h1>
          <div class="pa3 bt b--black-10">
            <p class="f6 f5-ns lh-copy measure">
              ${raw(state.paper.discussion)}
            </p>
          </div>
        </article>
        </section>
        <section class="fl mw6 w-50-ns pa3">
        (file browser)
        </section>
      </main>
    </body>
  `
}
