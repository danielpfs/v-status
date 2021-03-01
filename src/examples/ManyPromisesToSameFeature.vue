<template>
  <div>
    <h2>Execute and control many promises</h2>
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
      {{ $status.feature.errors }}
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
  mixins: [VStatus()],
  methods: {
    success () {
      this.$status.feature = [
        asyncFunction(100),
        asyncFunction(1000),
        asyncFunction(2000),
        asyncFunction(3000),
      ]
    },
    error () {
      this.$status.feature = [
        asyncFunction(100, 'Request failed'),
        asyncFunction(1000),
        asyncFunction(2000, 'Another error'),
        asyncFunction(3000),
      ]
    },
  }
}
</script>