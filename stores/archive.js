module.exports = archive

function archive (state, emitter) {
  var storage

  // state
  state.archive = null
  state.trackbook = {
    loaded: false,
    p2p: typeof DatArchive !== 'undefined',
    archives: { },
    active: ''
  }

  // events
  state.events.ARCHIVE_LOAD = 'archive:load'
  state.events.ARCHIVE_ADD = 'archive:add'
  state.events.ARCHIVE_READY = 'archive:ready'

  // listeners
  emitter.on(state.events.DOMCONTENTLOADED, handleSetup)
  emitter.on(state.events.ARCHIVE_LOAD, handleLoad)
  emitter.on(state.events.ARCHIVE_ADD, handleAdd)


  async function handleSetup () {
    var archives = window.localStorage.getItem('archives')
    storage = window.localStorage
    state.trackbook.archives = archives ? JSON.parse(archives) : { }
    state.trackbook.active = window.localStorage.getItem('active') || ''

    if (state.trackbook.active) {
      emitter.emit(state.events.ARCHIVE_LOAD, { url: state.trackbook.active })
    } else {
      state.trackbook.loaded = true
      emitter.emit(state.events.PUSHSTATE, '/start')
      emitter.emit(state.events.RENDER)
    }
  }

  async function handleAdd () {
    try {
      var archive = await DatArchive.selectArchive({
        title: 'Choose a Project to Track',
        buttonLabel: 'Add this project',
        filters: { isOwner: true }
      })
      emitter.emit(state.events.ARCHIVE_LOAD, { url: archive.url })
    } catch (err) {
      state.trackbook.error = err.message
      emitter.emit(state.events.RENDER)
      throw err
    }
  }


  async function handleLoad (props) {
    try {
      var archive = await new DatArchive(props.url)
      var info = await archive.getInfo()

      if (!info.isOwner) throw new Error('You must be the owner of the site')

      state.trackbook.archives[info.url] = info
      state.trackbook.active = info.url
      state.archive = archive
      storage.setItem('archives', JSON.stringify(state.trackbook.archives))
      storage.setItem('active', info.url)

      emitter.emit(state.events.ARCHIVE_READY)
      emitter.emit(state.events.PUSHSTATE, '/')
      emitter.emit(state.events.RENDER)
    } catch (err) {
      var archiveInfo = state.trackbook.archives[props.url]

      if (typeof archiveInfo === 'object') {
        archiveInfo.error = err.message
      }

      state.trackbook.error = err.message
      state.trackbook.loaded = true

      emitter.emit(state.events.RENDER)

      alert(err.message)
      console.warn(err)
    }
  }
}
