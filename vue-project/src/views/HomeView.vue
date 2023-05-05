<script setup>
import { render } from 'vue';
import ProjectList from '../components/ProjectList.vue';
</script>

<template>
<ProjectList v-if="projects.length" :projects="projects" @project-remove="deleteProject"></ProjectList>
<h1 v-else-if="apiCall">Start by creating a new project!</h1>

</template>

<style scoped>
h1 {
  font-size: 28px;
}
</style>

<script>
export default {
  name: "HomeView.vue",
  data(){
    return{
      projects : [],
      apiCall: false
    }
  },
  async mounted() {
    await this.axios.get(
      "http://localhost:4000/api/projects"
    ).then(response => {
      this.apiCall = true;
      this.projects = response.data})
  },
  methods:{
    deleteProject(id){
      this.projects = this.projects.filter(item => item._id !== id);
    }
  }
}
</script>