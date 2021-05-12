export default {
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
  }
}
