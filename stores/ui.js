module.exports = ui

function ui (state, emitter) {
  // state
  state.ui = {
    historyView: false
  }

  // events
  state.events.UI_TOGGLEHISTORY = 'start:togglehistory'

  // listeners
  emitter.on(state.events.UI_TOGGLEHISTORY, toggleHistory)

  function toggleHistory () {
    state.ui.historyView = !state.ui.historyView
    if (state.ui.historyView) {
      // TODO: do loading screen
      emitter.emit(state.events.ARCHIVE_HISTORY)
    } else {
      emitter.emit(state.events.RENDER)
    }
  }
}
