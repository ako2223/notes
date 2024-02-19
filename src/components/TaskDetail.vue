<template>
  <div class="task-detail" v-if="task">
    <h1>{{ task.text }}</h1>
    <p>{{ task.description }}</p>
    <p>Time: {{ task.time }}</p>
    <p>Date: {{ task.date }}</p>
    <button @click="editMode = true">Edit</button>
    <button @click="removeTask">Remove Task</button>
    <div v-if="editMode">
      <input v-model="editedText" placeholder="New task name">
      <textarea v-model="editedDescription" placeholder="New task description"></textarea>
      <input v-model="editedTime" placeholder="New task time e.g., 10:00 AM">
      <input v-model="editedDate" placeholder="New task date e.g., 2024-02-20">
      <button @click="saveChanges">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object
  },
  data() {
    return {
      editMode: false,
      editedText: '',
      editedDescription: '',
      editedTime: '',
      editedDate: ''
    };
  },
  watch: {
    task: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.editedText = newVal.text;
          this.editedDescription = newVal.description;
          this.editedTime = newVal.time;
          this.editedDate = newVal.date;
        }
      }
    }
  },
  methods: {
    saveChanges() {
      this.$emit('editTask', this.editedText, this.editedDescription, this.editedTime, this.editedDate);
      this.editMode = false;
    },
    removeTask() {
      this.$emit('removeTask');
    }
  }
};
</script>

<style scoped>
.task-detail {
  margin-left: 30%;
}
input, textarea {
  display: block;
  margin-bottom: 10px;
}
</style>
