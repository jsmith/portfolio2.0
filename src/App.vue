<template>
  <div class="c-primary font-mono h-screen pt-20 overflow-y-scroll">

    <stars></stars>

    <div class="mx-12 sm:mx-8">
      <div class="name-title font-bold inline relative text-5xl sm:text-3xl">{{ portfolio.name }}</div>
      <div class="tracking-widest-2 sm:text-sm">{{ portfolio.overviewText }}</div>
      <div class="icons mt-2">
        <GithubIcon :link="portfolio.socials.github"></GithubIcon>
        <Linkedin class="ml-3" :link="portfolio.socials.linkedin"></Linkedin>
        <Twitter class="ml-3" :link="portfolio.socials.twitter"></Twitter>
      </div>
    </div>

    <!-- Not sure why but mb-32 works the best for some reason. It ideally would be mb-8 -->
    <div class="mx-12 mt-8 mb-32 flex flex-wrap">
      <project 
        v-for="(project, i) in portfolio.projects" 
        :key="i"
        :project="project"
      ></project>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import Stars from './components/Stars.vue';
import GithubIcon from 'vue-material-design-icons/GithubCircle.vue';
import Linkedin from 'vue-material-design-icons/Linkedin.vue';
import Twitter from 'vue-material-design-icons/Twitter.vue';
import Project from '@/components/Project.vue';
import { createComponent, ref } from '@vue/composition-api';
import { PortfolioType, Portfolio } from './models';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold, left } from 'fp-ts/lib/Either';

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
// Grab GitHub stars information

export default createComponent({
  name: 'app',
  components: {
    Stars,
    Project,
    GithubIcon: LinkIcon(GithubIcon),
    Linkedin: LinkIcon(Linkedin),
    Twitter: LinkIcon(Twitter),
  },
  setup() {
    const emptyPorfolio: Portfolio = {
      name: '',
      overviewText: '',
      socials: {
        github: '',
        linkedin: '',
        twitter: '',
      },
      projects: [],
    };

    const portfolio = ref(emptyPorfolio);

    fetch('https://raw.githubusercontent.com/jsmith/portfolio-content/master/portfolio.json').then(async (res) => {
      const json = await res.json();
      const result = PortfolioType.decode(json);
      pipe(result, fold(
      (e) => {
        PathReporter.report(left(e)).forEach((error) => {
          // tslint:disable-next-line:no-console
          console.error(error);
        });
      },
      (value) => {
        portfolio.value = value;
      },
    ));
    });

    return {
      portfolio,
    };
  },
});
</script>

<style lang="scss">
html {
  background: radial-gradient(ellipse at bottom, var(--background2) 0%, var(-background1) 100%);
}

.name-title {
  // Must match margin-left below
  letter-spacing: 10px;

  &::before {
    content: "";
    background: var(--secondary);

    // Make it stretch out to the full size of the parent
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    // So that the text is on top
    z-index: -1;

    // So that the box goes at the bottom
    margin-top: 7%;

    // Must match letter spacing above
    margin-left: -10px;
  }
}

.material-design-icon, .material-design-icon__svg {
  height: 30px!important;
  width: 30px!important;
  color: var(--primary);
}

@media (max-width : 500px) {
  .material-design-icon, .material-design-icon__svg {
    height: 25px!important;
    width: 25px!important;
  }
}
</style>
