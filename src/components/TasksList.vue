<template>
  <div>
    <list-header :color="color">{{title}}</list-header>
    <q-list bordered separator>
      <task
        v-for="(task, key) in tasks"
        :key="key"
        :task="task"
        :id="key"
      ></task>
    </q-list>
  </div>
</template>

<script>
export default {
  props: {
    tasks: Object,
    title: String,
    color: String
  },
  components: {
    //task: require('src/components/Task.vue').default
    task: () => import('src/components/Task.vue'),
    "list-header": () => import('src/components/Shared/ListHeader.vue')    
  }
}
</script
    ListHeader>

<style lang="scss" scoped>
.list-header {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
