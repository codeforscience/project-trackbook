var Nanocomponent = require('nanocomponent')
var html = require('choo/html')

module.exports = function Wrapper () {
  if (!(this instanceof Modal)) return new Modal()
}

class Modal extends Nanocomponent {
  constructor () {
    super()
    this.state = {

    }

    this.handleContainerClick = this.handleContainerClick.bind(this)
  }

  createElement (props) {
    this.props = props || { }
    this.content = this.props.content || 'Modal Content'
    this.active = this.props.active || false
    this.className = this.props.className || ''

    return html`
      <div
        id="modal"
        class="fixed top-0 left-0 right-0 bottom-0 vh-100 dt w-100"
      >
        <div
          onclick=${this.handleContainerClick}
          class="relative dtc v-mid tc ph3 ph4-l z-2 ${this.className}">
          ${this.content}
        </div>
        <div
          class="absolute top-0 left-0 right-0 bottom-0 z-1"
          style="background: rgba(20, 20, 20, 0.75)"
          onclick=${this.handleContainerClick}
        ></div>
      </div>
    `
  }

  handleContainerClick (event) {
    if (this.props.handleContainerClick) {
      this.props.handleContainerClick(event)
    }
  }

  update (props) {
    return true
  }
}
