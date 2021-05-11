<template>
  <q-input
    outlined
    :value="dueDate"
    label="Due date"
    class="col q-mb-md"
    clearable
    @input="$emit('update:dueDate', $event)"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date :value="dueDate" @input="$emit('update:dueDate', $event)">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    dueDate: String
  }
}
</script>

<style></style>
