module.exports = store

function store (state, emitter) {
  state.statuses = {
    FRESH: 'files::state_fresh',
    FILES_READY: 'files::state_files_ready'
  }

  state.events.FILES_LOADED = 'files:loaded'
  state.events.FILES_REQUESTED = 'files:requested'

  state.files = []
  state.status = state.statuses.STATE_FRESH

  emitter.on('DOMContentLoaded', function () {
    emitter.on(state.events.FILES_LOADED, (files) => {
      state.files = files
      state.status = state.statuses.FILES_READY
      emitter.emit(state.events.RENDER)
    })

    emitter.on(state.events.ARCHIVE_READY, archive => {
      emitter.emit(state.events.FILES_REQUESTED)
    })

    emitter.on(state.events.FILES_REQUESTED, (dir = '/') => {
      state.archive.readdir(dir).then(files => {
        return Promise.all(files.map(fileName => {
          return state.archive.stat(fileName).then(result => {
            result.name = fileName
            return result
          })
        }))
      })
        .then(files => {
          emitter.emit(state.events.FILES_LOADED, files)
        })
    })
  })
}
