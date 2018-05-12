var choo = require('choo')
var md = require('marked')

require('./design')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.use(require('./plugins/scroll'))

app.use(require('./stores/start-page'))
app.use(require('./stores/archive'))
app.use(require('./stores/project-files'))
app.use(require('./stores/project-info'))

app.route('/', require('./views/main'))
app.route('/start', require('./views/start'))
app.route('/project', require('./views/project'))
app.route('/project/*', require('./views/project'))
app.route('/*', require('./views/404'))

// start
if (!module.parent) app.mount('body')
else module.exports = app
