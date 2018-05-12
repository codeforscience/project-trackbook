var html = require('choo/html')
var FileView = require('../components/file-view')

module.exports = view

var fileView = FileView()

function view (state, emit) {
  // if (!state.loaded) return renderLoading(state, emit)
  switch (state.status) {
    case state.statuses.FILES_READY:
      return fileView.render({ files: state.files, handleRowClick: onclick})
    default:
      return html`
        <p>Loading...</p>
      `
  }

  function onclick (ev, fileTree) {
    console.log('TODO', fileTree)
    // if (entry.type === 'directory') {
    //   emit('archive:directory', entry.name)
    //   return true
    // } else {
    //   entry.archiveKey = state.archive.key
    //   emit('preview:file', {entry: entry}, noop)
    //   return false
    // }
  }
}
