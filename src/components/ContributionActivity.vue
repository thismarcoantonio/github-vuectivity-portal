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
  margin-top: 24px;
}

.activity__list {
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;

  &:before {
    content: "";
    width: 2px;
    height: 100%;
    margin-left: 16px;
    position: absolute;
    background-color: lightgrey;
  }
}

.activity__list-item {
  display: flex;
  margin-left: 16px;
  position: relative;
  align-items: center;
  padding: 32px 0 32px 24px;
  justify-content: space-between;
  border-bottom: 2px solid lightgrey;
}

.activity__list-item--last {
  border-bottom: unset;
}

.activity__list-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: absolute;
  left: -16px;
  background-color: lightgrey;
  outline: 2px solid white;
}

.activity__list-collapse {
  cursor: pointer;
  width: 15px;
  height: 20px;
  background-color: lightgrey;
}

.activity__title {
  display: flex;
  position: relative;
  align-items: center;

  &:after {
    content: "";
    width: 100%;
    height: 1px;
    display: block;
    position: absolute;
    background-color: lightgrey;
  }
}

.activity__title-text {
  z-index: 1;
  position: relative;
  padding-right: 5px;
  background-color: white;
  font-weight: bold;
  color: #3E3E3E;
}

.activity__title-text--light {
  color: #777777;
}

.activity__action-button {
  width: 100%;
  color: blue;
  border-width: 2px;
  padding: 8px 0;
  height: auto;
  font-weight: bold;
}
</style>
