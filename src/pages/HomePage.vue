<template>
  <div id="app">
    <div class="task-menu">
      <h2>Task List</h2>
      <h3>Select:</h3>
      <ul>
        <li v-for="(task, index) in sortedTasks" :key="index" @click="selectTask(index)" :class="{ 'selected': selectedTaskIndex === index }">
          {{ task.text }} - {{ task.time }} - {{ task.date }}
        </li>
      </ul>
      <router-link to="/add-task">Add Task</router-link>
    </div>
    <TaskDetail :task="selectedTask" @editTask="editTask" @removeTask="removeTask" v-if="selectedTask" />
    <AddTask @taskAdded="handleTaskAdded" />
    
  </div>
</template>

<script>
import FirstComponent from '../components/FirstComponent.vue'
import TaskDetail from '../components/TaskDetail.vue' // Adjust the path as needed
import AddTask from '../components/AddTask.vue' 


export default {
  name: 'App',
  components: {
    TaskDetail,
    AddTask,
    FirstComponent
  },
  data() {
    return {
      tasks: [],
      selectedTaskIndex: null
    }
  },
  computed: {
    selectedTask() {
      return this.selectedTaskIndex !== null ? this.tasks[this.selectedTaskIndex] : null;
    },
    sortedTasks() {
      return this.tasks.slice().sort((a, b) => {
        const dateTimeA = new Date(`${a.date} ${a.time}`);
        const dateTimeB = new Date(`${b.date} ${b.time}`);
        return dateTimeA - dateTimeB;
      });
    }
  },
  methods: {
    selectTask(index) {
      this.selectedTaskIndex = index;
    },
    editTask(newText, newTime, newDate) {
      if (this.selectedTaskIndex !== null) {
        const task = this.tasks[this.selectedTaskIndex];
        task.text = newText;
        task.time = newTime;
        task.date = newDate;
        this.saveTasksToLocalStorage();
      }
    },
    removeTask() {
      if (this.selectedTaskIndex !== null) {
        if (confirm('Are you sure you want to remove this task?')) {
          this.tasks.splice(this.selectedTaskIndex, 1);
          this.selectedTaskIndex = null;
          this.saveTasksToLocalStorage();
        }
      }
    },
    handleTaskAdded(task) {
      console.log('Adding task:', task);
  this.tasks.push(task);
  this.saveTasksToLocalStorage();
  this.$router.push('/'); // This assumes you're using vue-router to navigate back to the homepage
},
    saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    loadTasksFromLocalStorage() {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      }
    }
  },
  mounted() {
    this.loadTasksFromLocalStorage();
  }
}
</script>

<style>
.task-menu {
  width: 25%;
  float: left;
}
.selected {
  background-color: lightgray;
}
</style>
