import Vue from 'vue'
import { uid } from 'quasar' //generate unique identifiers

const state = {
  /*  
  tasks: [
    {
      id: 1,
      name: 'Get early',
      caption: 'Do not forget to set up alarm',
      dueDate: '2021/07/14',
      dueTime: '06:30',
      completed: false
    },
    {
      id: 2,
      name: 'Drink coffee',
      caption: 'Strong, withot sugar',
      dueDate: '2021/07/14',
      dueTime: '07:30',
      completed: false
    },
    {
      id: 3,
      name: 'Write something useful',
      caption: 'Do not waste your time',
      dueDate: '2021/07/14',
      dueTime: '22:00',
      completed: false
    }
  ]
  */

  //firebase not using arrays but only objects
  tasks: {
    ID1: {
      name: 'Get early',
      caption: 'Do not forget to set up alarm',
      dueDate: '2021/07/14',
      dueTime: '06:30',
      completed: true
    },
    ID2: {
      name: 'Drink coffee',
      caption: 'Strong, withot sugar',
      dueDate: '2021/07/14',
      dueTime: '07:30',
      completed: false
    },
    ID3: {
      name: 'Write something useful',
      caption: 'Do not waste your time',
      dueDate: '2021/07/14',
      dueTime: '22:00',
      completed: false
    }
  },
  search: ''
}

const mutations = {
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task) //when add new object to the state, we need to use Vue.set(), to ensure the data remains reactive
  },
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id) //delete a keyed object from the state
  },
  setSearch(state, value) {
    state.search = value
  }
}

const actions = {
  addTask({ commit }, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }
    commit('addTask', payload)
  },
  updateTask({ commit }, payload) {
    commit('updateTask', payload)
  },
  deleteTask({ commit }, id) {
    commit('deleteTask', id)
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  }
}

const getters = {
  tasksFiltered: state => {
    let filteredTasks = {}
    let searchQuery = state.search.toLowerCase()

    if (state.search) {
      for (const key in state.tasks) {
        const task = state.tasks[key]
        if (task.name.toLowerCase().includes(searchQuery)) {
          filteredTasks[key] = task
        }
      }
      return filteredTasks
    } else {
      return state.tasks
    }
  },
  tasksTodo: (state, getters) => {
    let tasks = {}
    for (const key in getters.tasksFiltered) {
      const task = getters.tasksFiltered[key]
      if (!task.completed) {
        tasks[key] = task
      }
    }
    return tasks
  },
  tasksCompleted: (state, getters) => {
    let tasks = {}
    for (const key in getters.tasksFiltered) {
      const task = getters.tasksFiltered[key]
      if (task.completed) {
        tasks[key] = task
      }
    }
    return tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
