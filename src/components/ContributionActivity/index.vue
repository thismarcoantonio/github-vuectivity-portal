<template>
  <div class="wrapper">
    <h3>Contribution activity</h3>
    <div class="activity__list">
      <ul v-for="(monthData, monthIndex, index) in monthTiles[2012]" :key="index">
        <li v-if="monthData">
          <div
            :key="activityIndex"
            v-for="(activity, activityType, activityIndex) in monthData"
          >
            <activity-item
              :type="activityType"
              :isFirstItem="!activityIndex"
              :quantity="activity.quantity"
              :createdAt="activity.createdAt"
              :repositories="activity.repositories"
              :isLastItem="activityIndex === Object.keys(monthData).length - 1"
            />
          </div>
        </li>
      </ul>
    </div>
    <a-button class="activity__action-button">Show more activity</a-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import ActivityItem from "./ActivityItem"

export default {
  components: {
    ActivityItem
  },
  computed: {
    ...mapGetters("Timeline", ["monthTiles"])
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 2.4rem;
}

.activity__list {
  margin: 0;
  width: 100%;
  position: relative;

  &:before {
    content: "";
    height: 100%;
    width: 0.2rem;
    position: absolute;
    margin-left: 1.6rem;
    background-color: $color-grey-light;
  }
}

.activity__action-button {
  width: 100%;
  height: auto;
  padding: 0.8rem 0;
  font-size: 1.2rem;
  border-width: 0.1rem;
  color: $color-blue-primary;
  border-color: $color-grey-light;
  font-weight: $font-weight-semibold;

  &:hover,
  &:focus {
    color: $color-blue-primary;
    border-color: $color-grey-light;
    background-color: $color-blue-light;
  }
}
</style>
