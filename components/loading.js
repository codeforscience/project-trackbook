var html = require('choo/html')

module.exports = renderLoading

function renderLoading (state, emit) {
  return html`
    <body>
      <div class="loading">
      </div>
    </body>
  `
}