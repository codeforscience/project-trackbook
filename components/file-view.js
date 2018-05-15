var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var pretty = require('prettier-bytes')
var relative = require('relative-date')

module.exports = function Wrapper () {
  if (!(this instanceof FileTree)) return new FileTree()
}

class FileTree extends Nanocomponent {
  constructor () {
    super()
    this.state = {

    }

    this.handleRowClick = this.handleRowClick.bind(this)
  }

  createElement (props) {
    this.props = props || { }
    this.files = this.props.files || []
    this.className = this.props.className || ''

    var handleRowClick = this.handleRowClick

    return html`
      <section class="${this.className}">
        <table>
            <tr class="stripe-dark">
              <th>Name</th>
              <th>Size</th>
              <th>Time</th>
            </tr>
            ${this.files.map(fileRow)}
        </table>
      </section>
    `

    function fileRow (stats) {
      return html`
        <tr
          onclick=${handleRowClick}
          class="
            dim stripe-dark
            ${stats.isDirectory() ? 'folder' : 'file'}">
          <td> ${stats.name}</td>
          <td>${pretty(stats.size)}</td>
          <td>${relative(stats.mtime)}</td>
        </tr>
      `
    }
  }

  handleRowClick (event) {
    if (this.props.handleRowClick) {
      this.props.handleRowClick(event, this)
    }
  }

  update (props) {
    return true
  }
}
