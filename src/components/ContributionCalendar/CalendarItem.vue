<template>
  <li :class="['grid__item', `grid__item--color-${colorIntensity}`]">
    {{ consoleActivity() }}
  </li>
</template>

<script>
export default {
  props: {
    activityCount: Number,
    colorIntensity: Number
  },
  methods: {
    consoleActivity() {
    }
  }
}
</script>

<style lang="scss" scoped>
.grid__item {
  width: 100%;
  height: 10px;
  border-radius: 1px;
}

.grid__item--color-4 {
  background-color: #ebedf0;
}

.grid__item--color-3 {
  background-color: #c6e48b;
}

.grid__item--color-2 {
  background-color: #7bc96f;
}

.grid__item--color-1 {
  background-color: #239a3b;
}

.grid__item--color-0 {
  background-color: #196127;
}
</style>
