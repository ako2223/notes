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
      <button @click="addTask">Add Task</button>
    </div>
    <TaskDetail :task="selectedTask" @editTask="editTask" @removeTask="removeTask" v-if="selectedTask" />
  </div>
</template>

<script>
import TaskList from '../components/FirstComponent.vue'
import TaskDetail from '../components/TaskDetail.vue'

export default {
  name: 'App',
  components: {
    TaskList,
    TaskDetail
  },
  data() {
    return {
      tasks: [
        { text: 'Task 1', description: 'Description of Task 1', time: '10:00 AM', date: '2024-02-20' },
        { text: 'Task 2', description: 'Description of Task 2', time: '09:00 AM', date: '2024-02-21' },
        // Add more tasks as needed
      ],
      selectedTaskIndex: null
    }
  },
  computed: {
    selectedTask() {
      return this.selectedTaskIndex !== null ? this.tasks[this.selectedTaskIndex] : null;
    },
    sortedTasks() {
      return this.tasks.slice().sort((a, b) => {
        // Assuming date format is YYYY-MM-DD and time is HH:MM AM/PM
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
    addTask() {
      const newTaskText = prompt("Enter the new task name:");
      if (newTaskText !== null) {
        const newTaskDescription = prompt("Enter the description for the task:");
        const newTaskTime = prompt("Enter the time for the task (e.g., 10:00 AM):");
        const newTaskDate = prompt("Enter the date for the task (e.g., 2024-02-19):");
        this.tasks.push({
          text: newTaskText,
          description: newTaskDescription || '',
          time: newTaskTime || '',
          date: newTaskDate || ''
        });
      }
    },
    editTask(newText, newDescription) {
      if (this.selectedTaskIndex !== null) {
        this.tasks[this.selectedTaskIndex].text = newText;
        this.tasks[this.selectedTaskIndex].description = newDescription;
      }
    },
    removeTask() {
      if (this.selectedTaskIndex !== null) {
        if (confirm('Are you sure you want to remove this task?')) {
          this.tasks.splice(this.selectedTaskIndex, 1);
          this.selectedTaskIndex = null;
        }
      }
    }
  },
  mounted() {
    // Focus on the first task when the page loads
    if (this.tasks.length > 0) {
      this.selectTask(0);
    }}
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
