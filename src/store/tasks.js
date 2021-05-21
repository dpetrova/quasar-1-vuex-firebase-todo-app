import Vue from 'vue'
import { uid } from 'quasar' //generate unique identifiers
import { firebaseDb, firebaseAuth } from 'boot/firebase'

const state = {
  //firebase not using arrays but only objects
  tasks: {
    // ID1: {
    //   name: 'Get early',
    //   caption: 'Do not forget to set up alarm',
    //   dueDate: '2021/07/14',
    //   dueTime: '06:30',
    //   completed: true
    // },
    // ID2: {
    //   name: 'Drink coffee',
    //   caption: 'Strong, withot sugar',
    //   dueDate: '2021/07/14',
    //   dueTime: '07:30',
    //   completed: false
    // },
    // ID3: {
    //   name: 'Do something useful',
    //   caption: 'Do not waste your time',
    //   dueDate: '2021/07/30',
    //   dueTime: '22:00',
    //   completed: false
    // },
    // ID4: {
    //   name: 'Take a trip',
    //   caption: 'Do not waste your time',
    //   dueDate: '2021/07/20',
    //   dueTime: '08:00',
    //   completed: false
    // },
    // ID5: {
    //   name: 'Play with kids',
    //   caption: 'Do not waste your time',
    //   dueDate: '2021/07/14',
    //   dueTime: '06:30',
    //   completed: true
    // },
    // ID6: {
    //   name: 'Draw a sketch',
    //   caption: 'Do not waste your time',
    //   dueDate: '2021/07/14',
    //   dueTime: '07:30',
    //   completed: true
    // }
  },
  search: '',
  sort: 'name'
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
  },
  setSort(state, value) {
    state.sort = value
  }
}

const actions = {
  fbReadData({ commit }) {
    // console.log(firebaseAuth.currentUser)
    let userId = firebaseAuth.currentUser.uid
    let userTasks = firebaseDb.ref(`tasks/${userId}`)

    //child added hook
    userTasks.on('child_added', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        task: task
      }
      commit('addTask', payload)
    })

    //child changed hook
    userTasks.on('child_changed', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        updates: task
      }
      commit('updateTask', payload)
    })

    //child removed hook
    userTasks.on('child_removed', snapshot => {
      let taskId = snapshot.key
      commit('deleteTask', taskId)
    })
  },
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
  },
  setSort({ commit }, value) {
    commit('setSort', value)
  }
}

const getters = {
  tasksSorted: state => {
    let sortedTasks = {}
    let orderedKeys = Object.keys(state.tasks)

    orderedKeys.sort((a, b) => {
      let aProp = state.tasks[a][state.sort].toLowerCase()
      let bProp = state.tasks[b][state.sort].toLowerCase()
      if (aProp > bProp) return 1
      else if (aProp < bProp) return -1
      else return 0
    })

    for (const key of orderedKeys) {
      sortedTasks[key] = state.tasks[key]
    }

    return sortedTasks
  },
  tasksFiltered: (state, getters) => {
    let filteredTasks = {}
    let searchQuery = state.search.toLowerCase()

    if (state.search) {
      for (const key in getters.tasksSorted) {
        const task = getters.tasksSorted[key]
        if (task.name.toLowerCase().includes(searchQuery)) {
          filteredTasks[key] = task
        }
      }
      return filteredTasks
    } else {
      return getters.tasksSorted
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
