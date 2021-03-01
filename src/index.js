import VStatus from './status'

function install(Vue, props) {
  Vue.mixin(VStatus(props))
}

export default install
export { VStatus }