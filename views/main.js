var html = require('choo/html')
var objectKeys = require('object-keys')
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
        <h1 class="
          mw6 center bb b--dark-green
          f1 small-caps mv1">TrackBook!</h1>
      </header>
      <main class="pa3 pa5-ns flex justify-around flex-wrap">
        ${objectKeys(state.trackbook.archives).map(function (url) {
          return projectLink({
            url: url,
            archive: state.trackbook.archives[url],
            handleLoad: handleLoad
          })
        })}
        ${projectLink({
          handleLoad: handleAdd
        })}
      </main>
    </body>
  `

  function projectLink (props) {
    var info = props.archive
    var newProject = false
    if (!info) {
      newProject = true
      info = {}
      info.title = 'Start New TrackBook'
    }
    return html`
      <article
        class="
          ba b--dark-green w-30 mb5
          ${newProject ? 'bg-washed-green' : ''}
        ">
        <div class="flex flex-column justify-between h-100">
          <div class="ph3 pv2">
            <h4 class="f3 mb1 mt0">${info.title}</h3>
            ${description()}
          </div>
          <div class="mt2 cf">
            <a
              href="#"
              onclick=${handleProjectLoad}
              class="
                f4 no-underline bt bl b--dark-green
                tc fr bg-white
                black bg-animate hover-bg-dark-green hover-white
                pv1 ph3 border-box">
                ${newProject ? '+ Add New' : 'Open Project' }
            </a>
          </div>
        </div>
      </article>
    `

    function description () {
      if (info.description) return html`<p class="f6 black-70 mv1">${info.description}</p>`
      else if (!newProject) return html`<p class="f6 i black-40 mv1">(please set a project description!)</p>`

      // New Trackbook Dummy Description
      return html`
        <ul class="list mv1 pl0 f6 black-70">
          <li class="">1. Import a folder from your computer to Beaker</li>
          <li class="">2. Add New Project to start tracking</li>
        </ul>
      `
    }

    function handleProjectLoad () {
      if (typeof props.handleLoad === 'function') {
        props.handleLoad({ url: props.url, redirect: true })
      }
    }
  }

  function handleAdd () {
    emit(state.events.ARCHIVE_ADD)
  }

  function handleLoad (props) {
    emit(state.events.ARCHIVE_LOAD, props)
  }
}
