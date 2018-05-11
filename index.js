var css = require('sheetify')
var choo = require('choo')

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

// start
if (!module.parent) app.mount('body')
else module.exports = app
