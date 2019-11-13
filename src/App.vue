<template>
  <div id="app">
    <stars></stars>
    <div class="information">
      <div class="title">
        <div style="display: flex">
          <div class="title-text text-background">Jacob Smith</div>
        </div>
        <div style="display: flex" class="text-foreground">
          <div class="title-text">Jacob Smith</div>
        </div>
      </div>
      <div class="sub-title">Software Engineering @ UNB</div>
      <div style="margin-top: 10px" class="icons">
        <GithubIcon class="icon" link="https://github.com/jsmith"></GithubIcon>
        <Linkedin class="icon" link="https://linkedin.com/in/jacsmith21"></Linkedin>
        <Twitter class="icon" link="https://twitter.com/jacobsmith_1"></Twitter>
      </div>
    </div>
    <!-- <div class="projects">
      <Project
        v-for="(project, i) in projects" 
        :key="i"
        class="project"
        v-bind="project"
      ></Project>
      <div class="flex-end-spacer"></div>
    </div> -->
    <Projects class="projects"></Projects>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import Stars from './components/Stars.vue';
import Project from './components/Project.vue';
import Projects from './components/Projects.vue';
import GithubIcon from 'vue-material-design-icons/GithubCircle.vue';
import Linkedin from 'vue-material-design-icons/Linkedin.vue';
import Twitter from 'vue-material-design-icons/Twitter.vue';
import { createComponent } from '@vue/composition-api';
import projects from './assets/projects';

const LinkIcon = (icon: any) => Vue.extend({
  name: icon.name + 'Link',
  props: {
    link: String,
  },
  render(h) {
    return h(
      'a',
      {
        attrs: {
          target: '_blank',
          href: this.$props.link,
          style: 'text-decoration: none; color: white',
        },
      },
      [h(icon)],
    );
  },
});

// TODO
// 1. Google analytics

export default Vue.extend({
  name: 'app',
  components: {
    Stars,
    GithubIcon: LinkIcon(GithubIcon),
    Linkedin: LinkIcon(Linkedin),
    Twitter: LinkIcon(Twitter),
    Project,
    Projects,
  },
  data: () => ({
    projects,
  }),
});
</script>

<style lang="scss">
$foreground: var(--primary);
$background1: #f3f3f3;
$background2: #f0f1ea;

html {
  background: radial-gradient(ellipse at bottom, $background2 0%, $background1 100%);
}

#app {
  height: 100vh;
  margin: 100px 0;
  color: $foreground;
  font-family: 'lato',sans-serif;
}

body {
  margin: 0;
}

.information {
  margin: 0 50px;
}

.projects {
  display: flex; 
  overflow-x: scroll;
  padding: 60px 50px;
}

.projects::-webkit-scrollbar {
  display: none;
}

.project:first-child {
  margin-left: 50px;
}

.flex-end-spacer {
  flex: 0 0 50px;
}

.project {
  background: $background1;
  z-index: 100;
  position: relative;
}

.project + .project {
  margin-left: 20px;
}

.center-horizontal {
  display: flex;
  justify-content: center;
}

.title-text {
  font-weight: bold;
  display: inline;
}

.text-background {
  color: transparent;
  background: #efb5b7;
  max-height: 30px;
}

.text-foreground {
  margin-top: -58px;
  margin-left: 5px;
}

.title {
  display: flex;
  flex-direction: column;
  font-weight: 300;
  font-size: 50px;
  letter-spacing: 10px;
}

.sub-title {
  margin-top: 5px;
  letter-spacing: 4px;
}

.material-design-icon, .material-design-icon__svg {
  height: 30px!important;
  width: 30px!important;
  color: $foreground;
}

.icon + .icon {
  margin-left: 10px;
}

@media (max-width : 500px) {
  #app {
    margin-top: 40px;
  }

  .title {
    font-size: 35px;
    letter-spacing: 6px;
    height: 35px;
  }

  .sub-title {
    font-size: 13px;
  }

  .text-foreground {
    margin-top: -45px;
    margin-left: 3px;
  }

  .material-design-icon, .material-design-icon__svg {
    height: 25px!important;
    width: 25px!important;
  }
}
</style>
