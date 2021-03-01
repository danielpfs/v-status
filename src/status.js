import Vue from 'vue'

export default (props = { name: '$status' }) => ({
  computed: {
    [props.name]: {
      get () {
        /**
         * _vStatusMixin store all objects called by component to control status of promises and
         * it is a Proxy to automate generation of attributes
         */
        if (!this._vStatusMixin)
          // create a Proxy of Observable Vue object if not exists
          this._vStatusMixin = new Proxy(Vue.observable({}), {
            // get generate status objects
            get: (obj, attr) => {
              if (obj[attr] == undefined) {
                // function to reset to initial state of status
                const clear = () => {
                  this.$set(obj, attr, {
                    isLoading: false,
                    isError: false,
                    isSuccess: false,
                    error: {
                      message: undefined
                    },
                    errors: [],
                    clear
                  })
                }
                obj[attr] = this.$set(obj, attr, { clear }) // create object
                obj[attr].clear() // make sure that object starts with initial state
              }

              return obj[attr] // return object created
            },
            // when receive a promise, promises list or a function with a promise as return, manage status of promise
            set: (obj, attr, promise) => {
              const current = this[props.name]

              if (Array.isArray(promise))
                promise = Promise.all([...promise.map(p => p.catch(err => {
                  current[attr].errors.push({ message: Object.is(err) ? err.message : err })
                }))])

              if (typeof promise == 'function') // if value is a function, call before
                promise = promise()

              if (!promise.then) // check if is a valid promise, raise an error if not
                throw 'need to be a promise'

              // clear and change state to loading
              current[attr].clear()
              current[attr].isLoading = true

              promise
                .then(res => {
                  if (!current[attr].errors.length) {
                    // if promise be resolved, change state to success
                    current[attr].isLoading = false
                    current[attr].isSuccess = true
                  } else {
                    // if promise not be resolved, change state to error
                    current[attr].isLoading = false
                    current[attr].isError = true
                    current[attr].isSuccess = false
                    current[attr].error.message = `${current[attr].errors.length} error(s)`
                  }

                  return res
                })
                .catch(err => {
                  // if promise not be resolved, change state to error
                  current[attr].isLoading = false
                  current[attr].isError = true
                  current[attr].isSuccess = false
                  current[attr].error.message = Object.is(err) ? err.message : err

                  return err
                })

              return promise
            }
          })

        return this._vStatusMixin
      }
    }
  }
})