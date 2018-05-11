var html = require('choo/html')
var raw = require('choo/html/raw')

module.exports = infoView

function infoView (state, emit) {
  if (!state.paper) return '...loading'
  return html`
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
  `
}