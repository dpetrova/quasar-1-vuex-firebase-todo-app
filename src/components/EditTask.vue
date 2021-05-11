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
import ModalButtons from 'src/components/Shared/ModalButtons.vue'
import { mapActions } from 'vuex'

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
  components: {
    'modal-header': () => import('src/components/Shared/ModalHeader.vue'),
    'modal-task-name': () => import('src/components/Shared/ModalTaskName.vue'),
    'modal-task-caption': () =>
      import('src/components/Shared/ModalTaskCaption.vue'),
    'modal-task-due-date': () =>
      import('src/components/Shared/ModalTaskDueDate.vue'),
    'modal-task-due-time': () =>
      import('src/components/Shared/ModalTaskDueTime.vue'),
    'modal-buttons': () => import('src/components/Shared/ModalButtons.vue')
  },
  mounted() {
    this.taskToSubmit = Object.assign({}, this.task)
  }
}
</script>

<style></style>
