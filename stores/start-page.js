module.exports = startPage

function startPage (state, emitter) {
  // state
  state.startPage = {
    showModal: false
  }

  // events
  state.events.START_TOGGLEMODAL = 'start:togglemodal'

  // listeners
  emitter.on(state.events.START_TOGGLEMODAL, toggleModal)

  function toggleModal () {
    state.startPage.showModal = !state.startPage.showModal
    emitter.emit(state.events.RENDER)
  }
}
