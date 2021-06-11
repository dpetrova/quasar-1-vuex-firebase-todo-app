<template>
  <q-input
    outlined
    :value="name"
    label="Name"
    class="col"
    :rules="[val => !!val || 'Field is required']"
    ref="name"
    clearable
    v-select-all
    v-autofocus="{ delay: 700 }"
    @input="$emit('update:name', $event)"
  />
</template>

<script>
//import custom directives
import { selectAll } from 'src/directives/directive-select-all'
import { autofocus } from 'src/directives/directive-autofocus'

export default {
  props: {
    name: String
  },
  directives: {
    //directive to auto select all text in input field when focus
    // selectAll: {
    //   // inserted(el) {
    //   bind(el) {
    //     let input = el.querySelector('.q-field__native')
    //     input.addEventListener('focus', () => {
    //       if (input.value.length) {
    //         input.select()
    //       }
    //     })
    //   }
    // }
    selectAll,
    autofocus
  }
}
</script>

<style></style>
