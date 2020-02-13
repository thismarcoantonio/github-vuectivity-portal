<template>
  <a-row class="container">
    <a-col :xs="{ span: 20 }" :lg="{ span: 19 }">
      <contribution-calendar />
      <contribution-activity />
    </a-col>
    <a-col :xs="{ span: 2, offset: 2 }" :lg="{ span: 4, offset: 1 }">Right side</a-col>
  </a-row>
</template>

<script>
import ContributionCalendar from "@/components/ContributionCalendar"
import ContributionActivity from "@/components/ContributionActivity"

export default {
  components: {
    ContributionCalendar,
    ContributionActivity
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 95%;
    max-width: 930px;
    margin: 100px auto;
  }
</style>
