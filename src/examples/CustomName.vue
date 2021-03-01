<template>
  <div>
    <h2>Custom name</h2>
    <p>Only this component has status control. Just import 'v-status'</p>
    <div v-if="customName.feature.isLoading">Loading</div>
    <div
      v-else-if="customName.feature.isSuccess"
      class="success"
    >Success!</div>
    <div
      v-else-if="customName.feature.isError"
      class="error"
    >
      Oh no! An error has occurred.
      <div>Message: {{ customName.feature.error.message}}</div>
    </div>
    <div v-else>Click under to make tests</div>
    <div class="space" />
    <button
      class="success"
      :disabled="customName.feature.isLoading"
      :loading="customName.feature.isLoading"
      @click="success"
    >Make a success Promise</button>
    <button
      class="error"
      :disabled="customName.feature.isLoading"
      @click="error"
    >Make a error Promise</button>
  </div>
</template>

<script>
import { VStatus } from '@/index'
import asyncFunction from '@/../utils/asyncFunction'

export default {
  mixins: [VStatus({ name: 'customName' })], // change name of status manager
  methods: {
    success () {
      this.customName.feature = asyncFunction() // any async function
    },
    error () {
      this.customName.feature = asyncFunction(2000, 'Request failed')
    },
  }
}
</script>