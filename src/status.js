import Vue from 'vue'

export default {
  computed: {
    status: {
      get () {
        if (!this._statusMixin)
          this._statusMixin = new Proxy(Vue.observable({}), {
            get: (obj, attr) => {
              if (obj[attr] == undefined)
                this.$set(obj, attr, {
                  isLoading: false,
                  isError: false,
                  isSuccess: false,
                  error: {
                    message: undefined
                  },
                  errors: []
                })

              return obj[attr]
            },
            set: (obj, attr, value) => {
              this.setStatus(attr, value)

              return obj
            }
          })

        return this._statusMixin
      },
    }
  },
  methods: {
    statusClear (attr) {
      this.status[attr].isLoading = false
      this.status[attr].isError = false
      this.status[attr].isSuccess = false
      this.status[attr].error.message = undefined
      this.status[attr].errors = []
    },
    setStatus (attr, promise) {
      if (Array.isArray(promise))
        promise = Promise.all([...promise.map(p => p.catch(err => {
          this.status[attr].errors.push({ message: Object.is(err) ? err.message : err })
        }))])

      if (typeof promise == 'function') // caso seja uma função, executa antes
        promise = promise()

      if (!promise.then) // verifica se é uma promise, dispara erro caso não
        throw 'need to be a promise'

      this.statusClear(attr)

      // deixa o estado como loading
      this.status[attr].isLoading = true

      promise
        .then(res => {
          if (!this.status[attr].errors.length) {
            // caso seja sucesso, altera o estado para concluído
            this.status[attr].isLoading = false
            this.status[attr].isSuccess = true
          } else {
            // caso não seja sucesso, altera o estado para erro
            this.status[attr].isLoading = false
            this.status[attr].isError = true
            this.status[attr].isSuccess = false
            this.status[attr].error.message = `${this.status[attr].errors.length} erro(s)`
          }

          return res
        })
        .catch(err => {
          // caso não seja sucesso, altera o estado para erro
          this.status[attr].isLoading = false
          this.status[attr].isError = true
          this.status[attr].isSuccess = false
          this.status[attr].error.message = Object.is(err) ? err.message : err

          return err
        })
    }
  }
}