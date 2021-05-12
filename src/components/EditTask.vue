<template>
  <q-card>
    <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
      <!-- card header -->
      <modal-header>Edit Task</modal-header>
      <!-- card content -->
      <q-card-section class="q-pt-none">
        <modal-task-name :name.sync="taskToSubmit.name" ref="modalTaskName" />
        <modal-task-caption :caption.sync="taskToSubmit.caption" />
        <modal-task-due-date :dueDate.sync="taskToSubmit.dueDate" />
        <modal-task-due-time
          v-if="taskToSubmit.dueDate"
          :dueTime.sync="taskToSubmit.dueTime"
        />
      </q-card-section>
      <!-- card actions -->
      <modal-buttons></modal-buttons>
    </q-form>
    <!-- <pre>{{ taskToSubmit }}</pre> -->
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import mixinSharedComponents from 'src/mixins/shared-components'

export default {
  props: {
    task: Object,
    id: String
  },
  data() {
    return {
      taskToSubmit: {}
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask']),
    onSubmit() {
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      })
      this.$emit('close')
    },
    onReset() {}
  },
  created() {
    this.taskToSubmit = Object.assign({}, this.task)
  },
  mixins: [mixinSharedComponents]
}
</script>

<style></style>
