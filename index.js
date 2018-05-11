var css = require('sheetify')
var choo = require('choo')

css('tachyons')
css('./assets/custom.css')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.use(require('./stores/clicks'))
app.use(require('./stores/files'))
app.route('/', require('./views/main'))
app.route('/start', require('./views/start'))
app.route('/fileview', require('./views/file-viewer'))
app.route('/*', require('./views/404'))

// start
if (!module.parent) app.mount('body')
else module.exports = app
