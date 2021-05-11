<template>
  <q-banner class="bg-grey-3 q-mb-sm">
    <template v-slot:avatar>
      <q-icon name="check" color="primary" />
    </template>
    <slot></slot>
    <template v-slot:action>
      <q-btn
        flat
        color="primary"
        label="Add tasks"
        @click="$root.$emit('showAddTask')"
      />
    </template>
  </q-banner>
</template>

<script>
export default {}
</script>

<style></style>

<!-- 

@click="$emit('showAddTask')" -> child component emit to parent component
@click="$root.$emit('showAddTask')" -> global event but to all components

-->
