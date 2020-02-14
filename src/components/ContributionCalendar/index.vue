<template>
  <div>
    <h3>{{ getTotalContributions(yearTiles) }} contributions in {{ activeYear }}</h3>
    <a-card class="card">
      <div class="grid__header">
        <div
          :key="nameKey"
          class="grid__header-month"
          :style="`grid-column: span ${times};`"
          v-for="(times, nameKey) in monthNames"
        >
          {{ getMonthName(nameKey) }}
        </div>
      </div>
      <div class="grid__body">
        <ul class="grid__body-weeks">
          <li>Mon</li>
          <li>Wed</li>
          <li>Fri</li>
        </ul>
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
      </div>
      <div class="grid__contribution-footer">
        <a class="grid__contribution-link" href="#">Learn how we count contributions.</a>
        <div class="grid__contribution-graph">
          Less
          <span class="grid__contribution-graph-box" />
          <span class="grid__contribution-graph-box" />
          <span class="grid__contribution-graph-box" />
          <span class="grid__contribution-graph-box" />
          <span class="grid__contribution-graph-box" />
          More
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import { formatDate, formatMonth } from "@/utils/format"
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

      const intensity = Array.from(new Array(4), (_, i) => (activityIntensity / 4) * i)
        .reverse()
        .findIndex(intensity => tile.quantity > intensity) + 1

      return intensity || null
    },
    getTotalContributions(tiles) {
      const totalContributions = tiles.reduce((contributions, tile) => contributions + tile.quantity, 0)
      return Intl.NumberFormat("en-us", { separator: "," }).format(totalContributions)
    },
    getMonthName(nameKey) {
      const [year, month] = nameKey.split("-")
      return formatMonth(new Date(year, month), { isShort: true })
    }
  },
  computed: {
    ...mapState("Timeline", ["activeYear"]),
    ...mapGetters("Timeline", ["monthTiles", "yearTiles"]),
    monthNames() {
      return this.yearTiles.reduce((months, currentTile, index) => {
        if (!(index % 7 === 0)) return months

        const currentYear = currentTile.date.getFullYear()
        const currentMonth = currentTile.date.getMonth()
        const dateKey = `${currentYear}-${currentMonth}`

        return {
          ...months,
          [dateKey]: (months?.[dateKey] || 0) + 1
        }
      }, {})
    }
  },
  components: {
    CalendarItem
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 0 2.4rem;
  border-color: $color-grey-light;
}

.grid__body {
  display: flex;
  position: relative;
}

.grid__body-weeks {
  top: 1.2rem;
  height: 100%;
  display: flex;
  left: -2.8rem;
  font-size: 1rem;
  position: absolute;
  flex-direction: column;
  height: calc(100% - 2.4rem);
  justify-content: space-between;
}

.grid__container {
  flex-grow: 1;
  display: grid;
  grid-gap: 0.3rem;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 1fr);
  grid-template-columns: repeat(53, 1fr);
}

.grid__header {
  display: grid;
  font-size: 1rem;
  grid-gap: 0.3rem;
  margin-bottom: 0.5rem;
  grid-template-columns: repeat(53, 1fr);
}

.grid__header-month {
  text-align: center;
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

.grid__contribution-footer {
  display: flex;
  font-size: 1.1rem;
  margin-top: 0.8rem;
  align-items: center;
  justify-content: space-between;
}

.grid__contribution-link {
  color: $color-blue-primary;

  &:hover {
    text-decoration: underline;
  }
}

.grid__contribution-graph {
  display: flex;
  align-items: center;
}

.grid__contribution-graph-box {
  width: 1rem;
  height: 1rem;
  display: block;
  border-radius: 1px;
  margin-right: 0.3rem;

  &:nth-child(1) {
    margin-left: 0.8rem;
    background-color: $color-calendar-0;
  }

  &:nth-child(2) {
    background-color: $color-calendar-1;
  }

  &:nth-child(3) {
    background-color: $color-calendar-2;
  }

  &:nth-child(4) {
    background-color: $color-calendar-3;
  }

  &:nth-child(5) {
    margin-right: 0.8rem;
    background-color: $color-calendar-4;
  }
}
</style>
