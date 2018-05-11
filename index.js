var css = require('sheetify')
var choo = require('choo')
var md = require('marked')

css('tachyons')
css('./assets/custom.css')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.use(require('./stores/files'))
app.use(require('./plugins/scroll'))

app.use(require('./stores/start-page'))
app.use(require('./stores/archive'))
app.use(function (state, emitter) {
  state.paper = {}
  emitter.on(state.events.ARCHIVE_READY, function () {
    fetchPaper()
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

    async function fetchFile (path) {
      try {
        var data = await state.archive.readFile(path)
        return data
      } catch (e) {
        return `File: **${path}** not found`
        // console.error(e)
      }
    }
  })
})

app.route('/', require('./views/main'))
app.route('/start', require('./views/start'))
app.route('/fileview', require('./views/file-viewer'))
app.route('/*', require('./views/404'))

// start
if (!module.parent) app.mount('body')
else module.exports = app
