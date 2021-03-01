<template>
  <div>
    <h2>Many Async features</h2>
    <p>Only this component has status control. Just import 'v-status'</p>
    <div v-if="$status.a.isLoading">Loading</div>
    <div v-if="$status.b.isLoading">feature "B" is loading</div>
    <div v-if="$status.c.isLoading">feature "C" is loading</div>
    <div v-if="$status.d.isLoading">feature "D" is loading</div>
    <div
      v-else-if="$status.a.isSuccess"
      class="success"
    >Success!</div>
    <div
      v-else-if="$status.a.isError"
      class="error"
    >
      Oh no! An error has occurred.
      <div>Message: {{ $status.a.error.message}}</div>
    </div>
    <div v-else>Click under to make tests</div>
    <div class="space" />
    <button
      class="success"
      :disabled="$status.a.isLoading"
      :loading="$status.a.isLoading"
      @click="success"
    >Make a success Promise</button>
    <button
      class="error"
      :disabled="$status.a.isLoading"
      @click="error"
    >Make a error Promise</button>
  </div>
</template>

<script>
import { VStatus } from '@'
import asyncFunction from '@/../utils/asyncFunction'

export default {
  mixins: [VStatus()],
  methods: {
    success () {
      this.$status.a = async () => {
        await asyncFunction()
        await (this.$status.b = asyncFunction())
        this.$status.c = asyncFunction()
      }
    },
    error () {
      this.$status.a = asyncFunction(2000, 'Request failed')
    },
  },
  watch: {
    '$status.b.isLoading': function (v) {
      if (!v) return

      // some logic
      this.$status.d = asyncFunction()
    }
  }
}
</script>