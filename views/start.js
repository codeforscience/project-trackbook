var html = require('choo/html')
var Modal = require('../components/modal')

var TITLE = 'start - project trackbook'
var modal = Modal()

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="lh-copy bg-dark-gray white h-100">
      <main class="pa3 cf center">
        <section class="vh-75 dt w-100">
          <div class="dtc v-mid tc ph3 ph4-l">
            <h1 class="f-headline small-caps mb0">Project TrackBook</h1>
            <h5 class="f4 i mt0 mb6">A lab notebook with secure file sharing & version control!</h5>
            <h3 class="f3 tracked ttu moon-gray">Instructions</h3>
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
                f3 no-underline moon-gray
                bg-animate hover-bg-dark-green hover-white
                pa3 ba b--light-green border-box">1. Import Directory to Beaker</a>
            <a href=#
              onclick=${handleAdd}
              class="
                f3 no-underline moon-gray
                bg-animate hover-bg-dark-green hover-white
                pa3 ba b--light-green border-box">2. Add Project to TrackBook!</a>
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
