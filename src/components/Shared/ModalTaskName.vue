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
    @input="$emit('update:name', $event)"
  />
</template>

<script>
export default {
  props: {
    name: String
  }
}
</script>

<style></style>
