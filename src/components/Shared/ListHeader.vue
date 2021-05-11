<template>
  <q-banner
    inline-actions
    class="text-white text-center list-header"
    :class="color"
    dense
  >
    <span class="text-bold text-subtitle1"><slot></slot></span>
  </q-banner>
</template>

<script>
export default {
  props: {
    color: String
  }
}
</script>

<style></style>
