<template>
  <div>
    <h3>2,507 contributions in the last year</h3>
    <a-card class="card">
      <ul class="grid__container">
        <a-tooltip v-for="(date, index) in dates" :key="index" placement="top">
          <template slot="title">
            <span>no contributions on {{ formatDate(date) }}</span>
          </template>
          <li class="grid__item" />
        </a-tooltip>
      </ul>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dates: this.getDateArray()
    }
  },
  methods: {
    getDateArray () {
      const totalWeeksPerYear = 52
      const totalDaysPerWeek = 7
      const currentDate = new Date()
      const currentDay = currentDate.getDay() + 1
      const totalTiles = totalWeeksPerYear * totalDaysPerWeek + currentDay

      return Array.from(Array(totalTiles), (_, i) => {
        const actualDate = new Date().setDate(currentDate.getDate() - i)
        return new Date(actualDate)
      }).reverse()
    },
    formatDate (date) {
      const receivedDate = new Date(date)
      const shortMonth = Intl.DateTimeFormat("default", { month: "short" }).format(receivedDate)
      return `${shortMonth} ${receivedDate.getDate()}, ${receivedDate.getFullYear()}`
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  border-color: #d1d5da;
}

.grid__container {
  display: grid;
  grid-gap: 3px;
  padding-left: 0;
  grid-template-columns: repeat(53, 1fr);
  list-style: none;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 1fr);
}

.grid__item {
  width: 100%;
  height: 10px;
  border-radius: 1px;
  background-color: lightgrey;
}
</style>
