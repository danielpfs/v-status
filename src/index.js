import Status from './status'

function install(Vue, props = { name: 'status' }) {
  Vue.mixin(Status(props.name))
}

export default install