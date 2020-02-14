<template>
  <li :class="['grid__item', `grid__item--color-${colorIntensity > 0 ? colorIntensity : 'default'}`]" />
</template>

<script>
export default {
  props: {
    activityCount: Number,
    colorIntensity: Number
  }
}
</script>

<style lang="scss" scoped>
.grid__item {
  width: 100%;
  height: 1rem;
  border-radius: 1px;
}

.grid__item--color-4 {
  background-color: $color-calendar-1;
}

.grid__item--color-3 {
  background-color: $color-calendar-2;
}

.grid__item--color-2 {
  background-color: $color-calendar-3;
}

.grid__item--color-1 {
  background-color: $color-calendar-4;
}

.grid__item--color-default {
  background-color: $color-calendar-0;
}
</style>
