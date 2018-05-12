var md = require('marked')

module.exports = store

function store (state, emitter) {
  state.paper = {}
  state.history = []

  state.events.ARCHIVE_HISTORY = 'archive:history'

  emitter.on(state.events.ARCHIVE_READY, fetchPaper)
  emitter.on(state.events.ARCHIVE_HISTORY, fetchHistory)

  async function fetchPaper () {
    var introductionFile = await fetchFile('/paper/introduction.md')
    state.paper.introduction = md(introductionFile)

    var methodsFile = await fetchFile('/paper/methods.md')
    state.paper.methods = md(methodsFile)

    var resultsFile = await fetchFile('/paper/results.md')
    state.paper.results = md(resultsFile)

    var discussionFile = await fetchFile('/paper/discussion.md')
    state.paper.discussion = md(discussionFile)

    emitter.emit(state.events.RENDER)
  }

  async function fetchHistory () {
    if (!state.archive) return
    state.history = await state.archive.history({reverse: true})
    emitter.emit(state.events.RENDER)
  }

  async function fetchFile (path) {
    try {
      var data = await state.archive.readFile(path)
      return data
    } catch (e) {
      return `File: **${path}** not found`
      // console.error(e)
    }
  }
}
