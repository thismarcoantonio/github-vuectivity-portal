<template>
  <div>
    <ul class="years">
      <li v-for="year in years" :key="year">
        <a-button :class="['button', year === 2020 && 'button--active']">{{ year }}</a-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      years: this.getValidYears(new Date(2012, 1), new Date())
    }
  },
  methods: {
    getValidYears(initialDate) {
      const initialYear = new Date(initialDate).getFullYear() - 1
      const currentYear = new Date().getFullYear()

      return Array.from(new Array(currentYear - initialYear), (_, i) => currentYear - i)
    }
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
}
</style>
