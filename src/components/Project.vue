<template>
  <div class="project p-1 relative">
    <div 
      class="h-full w-full shadow-2xl"
      :class="{ 'bg-center bg-cover': !project.stretch }"
      :style="{ 
        'background-image': `url(${project.imageUrl})`, 
        'background-size': project.stretch ? '100% 100%' : '',
      }"
    ></div>
    <div class="absolute invisible inset-0 project-information m-8 md:m-6 p-2 flex flex-col shadow-xl">
      <div class="text-2xl md:text-lg tracking-widest">{{ project.name }}</div>
      <div class="mt-1 text-xs">
        <div 
          v-for="tag in project.tags"
          :key="tag"
          class="project-tag select-none inline-block rounded-full mb-1 mr-1 px-3 py-1 md:px-2 md:py-0"
        >
          {{ tag }}
        </div>
      </div>
      <div class="mt-2 md:text-sm">{{ project.description }}</div>
      <div class="flex-grow"></div>
      <a class="project-link md:text-sm" :href="project.link" target="_blank">$ start $WEBSITE</a>
      <a class="project-link md:text-sm" :href="project.repo" target="_blank">$ start $REPOSITORY</a>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, computed, watch } from '@vue/composition-api';
import { Project } from '../models';

export default createComponent({
  name: 'Project',
  props: {
    project: { type: Object as () => Project, required: true },
  },
});
</script>

<style lang="scss" scoped>
.project {
  height: 350px; 
  width: 350px;
}

// md screen
@media (max-width: 767px) {
  .project {
    height: 300px; 
    width: 300px;
  }
}

.project:hover > .project-information, .project:active .project-information {
  visibility: visible;
  background-color: var(--background1);
}

.project-tag {
  background: var(--secondary);
  opacity: 80;
}

.project-link {
  // text-decoration: none;
  color: inherit;

  &:hover, &:active {
    color: #b11212;
  }
}
</style>
