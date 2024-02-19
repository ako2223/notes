<template>
    <div>
      <h2>Add Task</h2>
      <form @submit.prevent="addTask">
        <label for="taskName">Task Name:</label>
        <input type="text" id="taskName" v-model="taskName" required>
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" required></textarea>
        <label for="time">Time:</label>
        <input type="text" id="time" v-model="time" placeholder="e.g., 10:00 AM" required>
        <label for="date">Date:</label>
        <input type="text" id="date" v-model="date" placeholder="e.g., 2024-02-20" required>
        <button type="submit">Add Task</button>
      </form>
      <button @click="returnHome">Return to Home</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        taskName: '',
        description: '',
        time: '',
        date: ''
      };
    },
    methods: {
      addTask() {
        if (!this.validateInput()) {
          return;
        }
        this.$emit('taskAdded', {
          text: this.taskName,
          description: this.description,
          time: this.time,
          date: this.date
        });
        this.taskName = '';
        this.description = '';
        this.time = '';
        this.date = '';
        this.$router.push('/');
      },
      validateInput() {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
        if (!dateRegex.test(this.date)) {
          alert('Date must be in YYYY-MM-DD format');
          return false;
        }
        if (!timeRegex.test(this.time)) {
          alert('Time must be in HH:MM AM/PM format');
          return false;
        }
        return true;
      },
      returnHome() {
        console.log('Trying to navigate home');
    this.$router.push('/'); // Navigate back to the homepage
  }

    },

}
  </script>
  
  <style scoped>
  /* Style as needed */
  </style>
  