<template>
  <div class="card container">
    <div class="project-title">{{ name }}</div>
    <div class="tags">{{ tagsFormatted }}</div>
    <div class="description">{{ description }}</div>
    <div style="flex: 1"></div>
    <div class="links">
      <a class="link" :href="link" target="_blank">Check it out!</a>
      <a class="repo" :href="repo" target="_blank">Repo</a>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api';

export default createComponent({
  props: {
    name: { type: String, required: true },
    tags: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    repo: { type: String, required: true },
  },
  setup(props) {
    return {
      tagsFormatted: computed(() => {
        return props.tags.split(',').join(', ');
      }),
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  min-width: 300px;
  border-radius: 2px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.project-title {
  font-size: 40px;
  font-weight: bold;
  font-weight: 300;
  letter-spacing: 10px;
}

.container {
  padding: 10px 16px;
  height: 170px;
  display: flex;
  flex-direction: column;
}

.links {
  display: flex;
}

.tags {
  color: #b18989;
  font-size: 14px;
  margin-top: 3px;
}

.description {
  margin-top: 10px;
}

.link, .repo {
  text-decoration: none;
  color: inherit;
  margin-right: 15px;

  &:hover {
    color:rgb(155, 67, 67);
  }

  &::before {
    content: "> ";
    color:rgb(155, 67, 67);
  }
}
</style>