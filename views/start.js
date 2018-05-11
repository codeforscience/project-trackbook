var html = require('choo/html')
var Modal = require('../components/modal')

var TITLE = 'start - project trackbook'
var modal = Modal()

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
      <main class="pa3 cf center">
        <section class="vh-75 dt w-100">
          <div class="dtc v-mid tc ph3 ph4-l">
            <h1 class="f-headline">Project Trackbook</h1>
            <h3 class="f3 tracked ttu">Instructions</h3>
            ${state.startPage.showModal ? modal.render({
              content: html`
                <div class="bg-white w-70 center">
                  <img src="/assets/import.gif" class="w-100">
                </div>
              `,
              handleContainerClick: toggleModal
            }) : ''}
            <a href=#
              onclick=${toggleModal}
              class="
                f3 no-underline black
                bg-animate hover-bg-black hover-white
                pa3 ba border-box">1. Import Directory to Beaker</a>
            <a href=#
              onclick=${handleAdd}
              class="
                f3 no-underline black
                bg-animate hover-bg-black hover-white
                pa3 ba border-box">2. Add Project to TrackBook!</a>
          </div>
        </section>
      </main>
    </body>
  `

  function handleAdd () {
    emit(state.events.ARCHIVE_ADD)
  }

  function toggleModal () {
    emit(state.events.START_TOGGLEMODAL)
  }
}
