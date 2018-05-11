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
    state.files = files
    state.status = state.statuses.FILES_READY
    emitter.emit(state.events.RENDER)
  })

  emitter.on(state.events.FILES_REQUESTED, (dir = './') => {
    state.archive.readdir(dir).then(files => {
      return Promise.all(files.map(fileName => {
        return state.archive.stat(fileName).then(result => ({...result, name: fileName}))
      }))
    })
      .then(files => {
        emitter.emit(state.events.FILES_LOADED, files)
      })
  })
}
