<template>
  <div id="app">
    <h1>Test Status</h1>
    <div v-if="status.feature.isLoading">Loading</div>
    <div
      v-else-if="status.feature.isSuccess"
      class="success"
    >Carregou com sucesso os dados</div>
    <div
      v-else-if="status.feature.isError"
      class="error"
    >
      Ocorreu um erro no carregamento.
      <div>Message: {{ status.feature.error.message}}</div>
    </div>
    <div v-else>Click under to make tests</div>
    <div class="space" />
    <button
      class="success"
      :disabled="status.feature.isLoading"
      @click="success"
    >Make a success Promise</button>
    <button
      class="error"
      :disabled="status.feature.isLoading"
      @click="error"
    >Make a error Promise</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    success () {
      this.status.feature = _fakePromise()
    },
    error () {
      this.status.feature = _fakePromise(2000, true)
    },

  }
}

function _fakePromise (duraction, returnError = false) {
  let resolve
  let error
  const promise = new Promise((res, e) => {
    resolve = res
    error = e
  })
  setTimeout(() => {
    console.log('promise running')
    return returnError ? error('Request failed') : resolve()
  }, duraction || 2000)

  return promise
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.space {
  margin: 20px;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>
