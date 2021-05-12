<template>
  <q-card>
    <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
      <!-- card header -->
      <modal-header>Add Task</modal-header>
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
  data() {
    return {
      taskToSubmit: {
        name: '',
        caption: '',
        dueDate: '',
        dueTime: '',
        completed: false
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['addTask']),
    onSubmit() {
      //no need this
      // this.$refs.modalTaskName.$refs.name.validate()
      // if (!this.$refs.modalTaskName.$refs.name.hasError) {
      //   //submit task
      // }
      this.addTask(this.taskToSubmit)
      this.$emit('close')
    },
    onReset() {}
  },
  mixins: [mixinSharedComponents]
}
</script>

<style></style>
