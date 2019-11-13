<template>
  <div class="container">
    <div 
      class="card"
      v-for="(project, i) in projects" 
      :key="i"
    >
      <div class="project-title">{{ project.name }}</div>
      <div class="tags">{{ project.tags | format }}</div>
      <div class="description">{{ project.description }}</div>
      <div style="flex: 1"></div>
      <div class="links">
        <a class="link" :href="project.link" target="_blank">Check it out!</a>
        <a class="repo" :href="project.repo" target="_blank">Repo</a>
      </div>
    </div>
    <div class="flex-end-spacer"></div>
  </div>
</template>

<script lang="ts">
import projects from '../assets/projects';

export default {
  name: 'Projects',
  data: () => ({
    projects,
  }),
  filters: {
    format(tags: string) {
      return tags.split(',').join(', ');
    },
  },
};
</script>

<style lang="scss" scoped>
$foreground: var(--primary);
$background: var(--secondary);

.flex-end-spacer {
  flex: 0 0 50px;
}

.container {
  display: flex;
}

.card {
  display: flex;
  flex-direction: column;
  height: 240px;
  flex: 0 0 200px;
  padding: 25px 15px;
  background-color: $background;
  border-radius: 10px;
  box-shadow: -0.5rem 0 2rem -0.7rem var(--primary);
  transition: 0.4s ease-out;
  position: relative;
  left: 0px;
}

.card:not(:first-child) {
  margin-left: -50px;
}

.card:hover {
  transform: translateY(-20px);
  transition: 0.4s ease-out;
}

.card:hover ~ .card {
  position: relative;
  left: 50px;
  transition: 0.4s ease-out;
}

.project-title {
  color: $foreground;
  font-size: 30px;
  font-weight: bold;
  font-weight: 400;
  letter-spacing: 5px;
}

.links {
  display: flex;
}

.tags {
  color: #b37373;
  font-size: 13px;
  margin-top: 3px;
}

.description {
  margin-top: 15px;
  font-size: 15px;
}

.link, .repo {
  text-decoration: none;
  color: inherit;
  margin-right: 15px;

  &:hover {
    color: #b11212;
  }

  &::before {
    content: "> ";
      color: #b11212;
  }
}
</style>