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
  font-size: 12px;
  text-align: left;
  margin-bottom: 8px;
  padding: 8px 16px;
  box-shadow: unset;
}

.button--active {
  color: white;
  background-color: #0366d6;

  &:hover, &:focus {
    color: white;
    background-color: #0366d6;
  }
}
</style>
