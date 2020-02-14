<template>
  <div class="wrapper">
    <h3>Contribution activity</h3>
    <ul class="activity__list">
      <li v-for="(item, index) in items" :key="index">
        <div class="activity__title" v-if="!index">
          <span class="activity__title-text">
            February <span class="activity__title-text--light">2020</span>
          </span>
        </div>
        <div :class="['activity__list-item', index === items.length - 1 && 'activity__list-item--last']">
          <div class="activity__list-icon"></div>
          <div v-if="item.repositories">
            Created 35 commits in {{ item.repositories.length }} {{ item.repositories.length > 1 ? "repositories" : "repository" }}
          </div>
          <div class="activity__list-collapse" />
        </div>
      </li>
    </ul>
    <a-button class="activity__action-button">Show more activity</a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          commits: 35,
          repositories: [{}, {}]
        },
        {
          pullRequests: 5,
          repositories: [{}]
        },
        {
          reviews: 5,
          repositories: [{ name: "rmosolgo/graphql-ruby", url: "#", commits: 65 }]
        },
        {
          private: true,
          contributions: 53
        }
      ]
    }
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

.activity__list-item {
  display: flex;
  position: relative;
  align-items: center;
  margin-left: 1.6rem;
  justify-content: space-between;
  padding: 3.2rem 0 3.2rem 2.4rem;
  border-bottom: 2px solid $color-grey-light;
}

.activity__list-item--last {
  border-bottom: unset;
}

.activity__list-icon {
  left: -1.6rem;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  position: absolute;
  outline: 2px solid $color-white;
  background-color: $color-grey-light;
}

.activity__list-collapse {
  cursor: pointer;
  height: 2rem;
  width: 1.5rem;
  background-color: $color-grey-light;
}

.activity__title {
  display: flex;
  font-size: 1.2rem;
  position: relative;
  align-items: center;

  &:after {
    content: "";
    width: 100%;
    height: 1px;
    display: block;
    position: absolute;
    background-color: $color-grey-light;
  }
}

.activity__title-text {
  z-index: 1;
  position: relative;
  background-color: $color-white;
  font-weight: $font-weight-bold;
  padding: 0.8rem 0.5rem 0.8rem 0;
}

.activity__title-text--light {
  color: $color-grey-normal;
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

  &:hover, &:focus {
    color: $color-blue-primary;
    border-color: $color-grey-light;
    background-color: $color-blue-light;
  }
}
</style>
