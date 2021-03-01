<template>
  <div>
    <h2>Local usage</h2>
    <p>Only this component has status control. Just import 'v-status'</p>
    <div v-if="$status.feature.isLoading">Loading</div>
    <div
      v-else-if="$status.feature.isSuccess"
      class="success"
    >Success!</div>
    <div
      v-else-if="$status.feature.isError"
      class="error"
    >
      Oh no! An error has occurred.
      <div>Message: {{ $status.feature.error.message}}</div>
    </div>
    <div v-else>Click under to make tests</div>
    <div class="space" />
    <button
      class="success"
      :disabled="$status.feature.isLoading"
      :loading="$status.feature.isLoading"
      @click="success"
    >Make a success Promise</button>
    <button
      class="error"
      :disabled="$status.feature.isLoading"
      @click="error"
    >Make a error Promise</button>
  </div>
</template>

<script>
import { VStatus } from '@/index'
import asyncFunction from '@/../utils/asyncFunction'

export default {
  mixins: [VStatus({ name: '$status' })],
  methods: {
    success () {
      this.$status.feature = asyncFunction() // any async function
    },
    error () {
      this.$status.feature = asyncFunction(2000, 'Request failed')
    },
  }
}
</script>