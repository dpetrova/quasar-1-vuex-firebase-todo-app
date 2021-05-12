<template>
  <q-input
    outlined
    :value="name"
    label="Name"
    class="col"
    :rules="[val => !!val || 'Field is required']"
    ref="name"
    autofocus
    clearable
    v-select-all
    @input="$emit('update:name', $event)"
  />
</template>

<script>
import { selectAll } from 'src/directives/directive-select-all' //import custom directive

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
    selectAll
  }
}
</script>

<style></style>
