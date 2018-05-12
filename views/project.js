var html = require('choo/html')
var pretty = require('prettier-bytes')
var relative = require('relative-date')
var renderLoading = require('../components/loading')
var infoView = require('../components/info-view')
var fileView = require('../views/file-viewer')
var historyView = require('../views/history-view')

var TITLE = 'project trackbook'

module.exports = view

function view (state, emit) {
  // loading
  if (!state.trackbook.loaded) return renderLoading(state, emit)

  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  var archiveInfo = state.trackbook.archives[state.trackbook.active]

  return html`
    <body class="lh-copy">
      <main class="cf">
        <section class="fl pa3 ph4-ns w-50-ns bg-light-gray">
          <header class="mw5 mw6-ns mb4" data-name="slab-stat-small">
            <h3 class="f2 fw3 mv1 ttu">${archiveInfo.title}</h3>
            <div class="cf">
              <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                <dd class="f6 fw4 ml0">Last Update</dd>
                <dd class="f3 fw6 ml0">${relative(archiveInfo.mtime)}</dd>
              </dl>
              <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                <dd class="f6 fw4 ml0">Size</dd>
                <dd class="f3 fw6 ml0">${pretty(archiveInfo.size)}</dd>
              </dl>
              <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                <dd class="f6 fw4 ml0">Total Revisions</dd>
                <dd class="f3 fw6 ml0">${archiveInfo.version}</dd>
              </dl>
              <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                <dd class="f6 fw4 ml0">Active Peers</dd>
                <dd class="f3 fw6 ml0">${archiveInfo.peers}</dd>
              </dl>
              <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                <dd class="f6 fw4 ml0">Owner?</dd>
                <dd class="f3 fw6 ml0">${archiveInfo.isOwner ? 'Yes' : 'No'}</dd>
              </dl>
              <h6 class="f6 mt2 db ttl tracked-tight code fw8">dat://${archiveInfo.key}</dd>
              <hr class="bb b--black-10">
            </div>
          </header>
          ${infoView(state, emit)}
        </section>
        <section class="fl w-50-ns pa3 ph4-ns">
          ${buttons()}
          ${state.ui.historyView ? historyView(state, emit) : fileView(state, emit)}
        </section>
      </main>
    </body>
  `

  function buttons () {
    var btnClass=`ba b--dark-green
                  tc bg-white
                  black bg-animate hover-bg-dark-green hover-white
                  border-box pointer`
    var activeClass = `bb b--dark-green`
    return html`
      <div class="mv2">
        <a class="f3 mh4 no-underline pv1 ph4 ${state.ui.historyView ? btnClass : activeClass}" onclick=${toggleHistory}>files</a>
        <a class="f3 mh4 no-underline pv1 ph4 ${state.ui.historyView ? activeClass : btnClass}" onclick=${toggleHistory}>history</a>
        <hr class="mv4 bb b--black-10">
      </div>`
  }

  function toggleHistory () {
    emit(state.events.UI_TOGGLEHISTORY)
  }
}
