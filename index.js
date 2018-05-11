var css = require('sheetify')
var choo = require('choo')
var md = require('marked')

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.use(require('./plugins/scroll'))

app.use(require('./stores/start-page'))
app.use(require('./stores/archive'))

app.route('/', require('./views/main'))
app.route('/start', require('./views/start'))
app.route('/fileview', require('./views/file-viewer'))
app.route('/*', require('./views/404'))

app.use(function (state, emitter) {
  state.archive = new DatArchive(window.location.href)
  fetchArchive()
  async function fetchArchive () {
    state.paper = {}

    var introductionFile = await state.archive.readFile('/paper/introduction.md')
    state.paper.introduction = md(introductionFile)

    var methodsFile = await state.archive.readFile('/paper/methods.md')
    state.paper.methods = md(methodsFile)

    var resultsFile = await state.archive.readFile('/paper/results.md')
    state.paper.results = md(resultsFile)

    var discussionFile = await state.archive.readFile('/paper/discussion.md')
    state.paper.discussion = md(discussionFile)

    emitter.emit(state.events.RENDER)
  }
})

// start
if (!module.parent) app.mount('body')
else module.exports = app
