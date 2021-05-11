<template>
  <q-input
    outlined
    :value="caption"
    label="Caption"
    class="col q-mb-md"
    clearable
    @input="$emit('update:caption', $event)"
  />
</template>

<script>
export default {
  props: {
    caption: String
  }
}
</script>

<style></style>
