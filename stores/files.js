module.exports = store

function store (state, emitter) {

  state.statuses = {
    FRESH: 'files::state_fresh',
    FILES_READY: 'files::state_files_ready'
  }

  state.events.FILES_LOADED = 'files::loaded'
  state.events.FILES_REQUESTED = 'files::requested'

  state.files = []
  state.status = state.statuses.STATE_FRESH
  state.archive = new DatArchive(window.location.href)


    emitter.on(state.events.FILES_LOADED, (files) => {
      debugger
      state.files = files
      state.status = state.statuses.FILES_READY
      emitter.emit(state.events.RENDER)
    })

    emitter.on(state.events.FILES_REQUESTED, (dir) => {
      debugger
      state.archive.readdir(dir).then(files => {
        emitter.emit(state.events.FILES_LOADED, files)
      })
    })
}
