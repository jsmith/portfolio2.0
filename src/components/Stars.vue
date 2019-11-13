<template>
  <div>
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';

export default createComponent({
  name: 'Stars',
});
</script>

<style lang="scss">
html {
	height: 100%;
	overflow: hidden;
}
</style>

<style lang="scss" scoped>
$color: #754444;

// n is number of stars required
@function multiple-box-shadow ($n) {
  $value: '#{random(2000)}px #{random(2000)}px #{$color}';
  @for $i from 2 through $n {
    $value: '#{$value} , #{random(2000)}px #{random(2000)}px #{$color}';
  }

  @return unquote($value);
}

$shadows-small: multiple-box-shadow(700);
$shadows-medium: multiple-box-shadow(200);
$shadows-big: multiple-box-shadow(100);

.stars {
	width: 1px;
	height: 1px;
	background: transparent;
	box-shadow: $shadows-small;
	animation: animStar 50s linear infinite;
}

.stars2 {
	width: 2px;
	height: 2px;
	background: transparent;
	box-shadow: $shadows-medium;
  animation: animStar 100s linear infinite;
}

.stars3 {
	width: 3px;
	height: 3px;
	background: transparent;
	box-shadow: $shadows-big;
	animation: animStar 150s linear infinite;
}

@keyframes animStar {
	from {
		transform: translateY(0px);
	}

	to {
		transform: translateY(-2000px);
	}
}
</style>