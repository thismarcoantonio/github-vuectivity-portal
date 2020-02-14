<template>
  <div>
    <ul class="years">
      <li v-for="year in validYears" :key="year">
        <a-button
          :class="['button', year === activeYear && 'button--active']"
          @click="setActiveYear(year)"
        >
          {{ year }}
        </a-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex"

export default {
  methods: {
    ...mapActions("Timeline", ["setActiveYear"])
  },
  computed: {
    ...mapState("Timeline", ["activeYear"]),
    ...mapGetters("Timeline", ["validYears"])
  }
}
</script>

<style lang="scss" scoped>
.years {
  width: 90%;
}

.button {
  border: 0;
  width: 100%;
  text-align: left;
  box-shadow: unset;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  padding: 0.8rem 1.6rem;
}

.button--active, .button--active:hover, .button--active:focus {
  color: $color-white;
  background-color: $color-blue-primary;
}
</style>
