<template>
  <div>
    <div class="activity__title" v-if="isFirstItem">
      <span class="activity__title-text">
        {{ monthName }} <span class="activity__title-text--light">{{ createdAt.getFullYear() }}</span>
      </span>
    </div>

    <div :class="['activity__list-item', isLastItem && 'activity__list-item--last']">
      <div class="activity__list-header" v-if="repositories">
        <div class="activity__list-icon">
          <Icon :icon="getActivityIcon(type)" />
        </div>

        {{ getActivityMessage({ quantity, repositories: repositories.length }) }}

        <div class="activity__list-collapse-icon" @click="toggleCollapse()">
          <Icon :icon="collapsed ? 'more-alt' : 'more'" />
        </div>
      </div>

      <div :class="['activity__list-collapse', !collapsed && 'activity__list-collapse--active']">
        <div v-for="repository in repositories" :key="repository">
          {{ getRepositoryName(repository) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "vue-themify-icons"
import { formatShortMonth } from "@/utils/format"

export default {
  data() {
    return {
      collapsed: true
    }
  },
  components: {
    Icon
  },
  props: {
    type: String,
    createdAt: Date,
    quantity: Number,
    repositories: Array,
    isLastItem: Boolean,
    isFirstItem: Boolean
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed
    },
    getActivityMessage({ quantity, repositories }) {
      const repositoryText = repositories > 1 ? "repositories" : "repository"

      switch (this.type) {
        case "fork":
          return `Received ${quantity} forks at ${repositories} ${repositoryText}`
        case "push":
          return `Pushed ${quantity} commits to ${repositories} ${repositoryText}`
        case "star":
          return `Received ${quantity} stars at ${repositories} ${repositoryText}`
        case "wiki":
          return `Updated ${repositories} ${repositoryText} wiki ${quantity} times`
        case "issues":
          return `Created ${quantity} issues at ${repositories} ${repositoryText}`
        case "pullRequest":
          return `Interacted ${quantity} times with pull requests at ${repositories} ${repositoryText}`
        case "issueComments":
          return `Commented ${quantity} times at ${repositories} repository issues`
      }
    },
    getActivityIcon(type) {
      const iconsByType = {
        fork: "back-right",
        push: "cloud-up",
        star: "star",
        wiki: "book",
        issues: "info-alt",
        pullRequest: "help-alt",
        issueComments: "comments"
      }
      return iconsByType[type]
    },
    getRepositoryName(repository) {
      const githubUrl = "https://github.com/"
      return repository.replace(githubUrl, "")
    }
  },
  computed: {
    monthName() {
      return formatShortMonth(this.createdAt)
    }
  }
}
</script>

<style lang="scss" scoped>
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

.activity__list-item {
  margin-left: 1.6rem;
  padding: 3.2rem 0 3.2rem 2.4rem;
  border-bottom: 2px solid $color-grey-light;
}

.activity__list-item--last {
  border-bottom: unset;
}

.activity__list-header {
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
}

.activity__list-icon {
  display: flex;
  left: -4rem;
  width: 3.2rem;
  height: 3.2rem;
  font-size: 1.8rem;
  border-radius: 50%;
  position: absolute;
  color: $color-black;
  align-items: center;
  justify-content: center;
  outline: 2px solid $color-white;
  background-color: $color-grey-light;
}

.activity__list-collapse-icon {
  cursor: pointer;
  right: 0;
  font-size: 1.8rem;
  position: absolute;
}

.activity__list-collapse {
  max-height: 0;
  margin-top: 0;
  overflow: hidden;
  font-size: 1.4rem;
  transition: ease-in-out 377ms;
  transition-property: max-height, margin-top;
}

.activity__list-collapse--active {
  max-height: 10rem;
  margin-top: 2.4rem;
}
</style>
