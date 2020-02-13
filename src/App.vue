<template>
  <div class="main-column">
    <a-row>
      <a-col :xs="{ span: 20 }" :lg="{ span: 19 }">
        <contribution-calendar />
        <contribution-activity />
      </a-col>
      <a-col :xs="{ span: 2, offset: 2 }" :lg="{ span: 4, offset: 1 }">
        <year-sidebar />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import YearSidebar from "@/components/YearSidebar"
import ContributionCalendar from "@/components/ContributionCalendar"
import ContributionActivity from "@/components/ContributionActivity"

export default {
  mounted() {
    this.setTimelineInfo()
  },
  components: {
    ContributionCalendar,
    ContributionActivity,
    YearSidebar
  },
  methods: {
    ...mapActions("Timeline", ["setTimelineInfo"])
  }
}
</script>

<style lang="scss">
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .main-column {
    width: 95%;
    max-width: 930px;
    margin: 100px auto;
  }
</style>
