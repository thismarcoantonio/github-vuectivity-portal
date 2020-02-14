<template>
  <div>
    <h3>{{ getTotalContributions(yearTiles) }} contributions in {{ activeYear }}</h3>
    <a-card class="card">
      <ul class="grid__container">
        <a-tooltip v-for="(tile, index) in yearTiles" :key="index" placement="top">
          <template slot="title">
            <span class="contribution">
              <span class="contribution__quantity">
                {{ tile.quantity || "no" }} contributions
              </span>
              on
              <span class="contribution__date">
                 {{ formatDate(tile.date) }}
              </span>
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
import { mapGetters, mapState } from "vuex"
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

      const intensity = Array.from(new Array(5), (_, i) => (activityIntensity / 5) * i)
        .reverse()
        .findIndex(intensity => tile.quantity >= intensity)

      return intensity || null
    },
    getTotalContributions(tiles) {
      const totalContributions = tiles.reduce((contributions, tile) => contributions + tile.quantity, 0)
      return Intl.NumberFormat("en-us", { separator: "," }).format(totalContributions)
    }
  },
  computed: {
    ...mapState("Timeline", ["activeYear"]),
    ...mapGetters("Timeline", ["monthTiles", "yearTiles"])
  },
  components: {
    CalendarItem
  }
}
</script>

<style lang="scss" scoped>
.card {
  border-color: $color-grey-light;
}

.grid__container {
  display: grid;
  grid-gap: 0.3rem;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 1fr);
  grid-template-columns: repeat(53, 1fr);
}

.contribution {
  font-size: 1.2rem;
  color: $color-grey-light;
}

.contribution__quantity {
  font-weight: $font-weight-semibold;
}

.contribution__date {
  color: $color-grey-normal;
  text-transform: capitalize;
}
</style>
