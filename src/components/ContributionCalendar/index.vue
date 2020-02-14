<template>
  <div>
    <h3>2,507 contributions in the last year</h3>
    <a-card class="card">
      <ul class="grid__container">
        <a-tooltip v-for="(tile, index) in yearTiles" :key="index" placement="top">
          <template slot="title">
            <span>
              {{ tile.quantity || "no" }} contributions on {{formatDate(tile.date)}}
            </span>
          </template>
          <li>
            <calendar-item
              :activityCount="getActivityCount(tile.date)"
              :colorIntensity="getActivityColor(yearTiles, tile)"
            />
          </li>
        </a-tooltip>
      </ul>
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { formatDate } from "@/utils/format"
import CalendarItem from "./CalendarItem"

export default {
  methods: {
    formatDate,
    getActivityCount(currentDate) {
      const currentYear = currentDate.getFullYear()
      const currentMonth = currentDate.getMonth()
      const currentTile = Object.values(this.monthTiles?.[currentYear]?.[currentMonth] || {})

      return currentTile.reduce((acc, item) => (item.quantity || 0) + acc, 0)
    },
    getActivityColor(tiles, tile) {
      const mappedTiles = tiles.map(tile => tile.quantity)
      const minTile = Math.min(...mappedTiles)
      const maxTile = Math.max(...mappedTiles)
      const activityIntensity = maxTile - minTile

      return Array.from(new Array(5), (_, i) => (activityIntensity / 5) * i)
        .reverse()
        .findIndex(intensity => tile.quantity >= intensity)
    }
  },
  computed: {
    ...mapGetters("Timeline", ["monthTiles", "yearTiles"])
  },
  components: {
    CalendarItem
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
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 1fr);
  grid-template-columns: repeat(53, 1fr);
}
</style>
