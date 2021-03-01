# v-status - Manage the loading of promises in Vuejs
A lib to control status of promises in Vuejs components

# Features
* Simple to use.
* Allows you to listen to one or more promises.
* Controls the status of more than one asynchronous resource in the same component.
* Performable and consumes no memory if never called on the component.
* Easy implementation to watch state changes.

# Installation
Add v-status in your project using npm: 
```shell
npm install v-status
```
or using yarn:
```shell
yarn add v-status
```

# Usage
## Importing
### Globally
```js
import Vue from 'vue'
import VStatus from 'v-status'

Vue.use(VStatus)
```
### Local as Mixin
```js
import { VStatus } from 'v-status'

// your component
export default {
  mixins: [VStatus()],
. . .
```
## Using in your Components
```html
<template>

  <!-- Loading State -->
  <div v-if="$status.myFeature.isLoading">Loading</div>

  <!-- Success State -->
  <div
    v-else-if="$status.myFeature.isSuccess"
  >Success!</div>

  <!-- Error State -->
  <div
    v-else-if="$status.myFeature.isError"
  >
    Oh no! An error has occurred.
    <div>Message: {{ $status.myFeature.error.message }}</div>
  </div>

</template>

<script>
export default {
  created() {
    this.$status.myFeature = async () => {
      . . . // some async logic
    }
  }
}
</script>
```
### Reactive Properties
When using 'this.$status.myFeature', an object with the following properties will be automatically generated:

| Property      | Type     | Default   | Description                                                                        |
|---------------|----------|-----------|------------------------------------------------------------------------------------|
| isSuccess     | bool     | false     | It is true when promise received has been resolved.                                |
| isError       | bool     | false     | It is true when promise received has not been resolved.                            |
| isLoading     | bool     | false     | It is true when promise received is waiting for some result.                       |
| error.message | string   | undefined | Catch error message when promise has not been resolved.                            |
| erros         | array    | array     | Returns a list of errors when one or more promises received has not been resolved. |
| clear         | function | function  | Resets the state to the default when called.                                       |

### Passing Promises
When dispatch a promise, set it where you want to use:
```js
this.$status.anotherFeature = this.$axios.get('/users') // async call example 
```
The setter accepts the following types:
| Accepted Types    | Description                                                                                |
|-------------------|--------------------------------------------------------------------------------------------|
| Promise           | Accept a Promise as value.                                                                 |
| function: Promise | Call the function automatically and receive a promise to return. No arguments is provided. |
| array[Promise]    | It runs automatically in Promise.all. Awaits all promises to return result.                |

Returns the same Promise provided.

## Advanced Configuration
You can customize the default name "$status" to whatever you want:
```js
. . .
Vue.use(Vstatus, { name: 'customName' }) // global
. . .
// or (local in component)
export default {
  mixins: [VStatus({ name: 'customName' }],
. . .
// using example
this.customName.aCoolFeature.isLoading
. . .
```

