import { fetchData } from "@/services"

export default {
  async setTimelineInfo({ commit }) {
    const data = await fetchData()
    commit("setTimelineInfo", data)
  },
  setActiveYear({ commit }, activeYear) {
    commit("setActiveYear", activeYear)
  }
}
