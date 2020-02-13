export default {
  validYears(state) {
    const yearsPayload = state.timeline.map(item => item.created_at)
    const currentYear = new Date().getFullYear()
    const initialYear = yearsPayload.reduce((initialYear, currentDate) => {
      const currentYear = new Date(currentDate).getFullYear()
      return initialYear < currentYear ? initialYear : currentYear
    }, new Date().getFullYear()) - 1

    return Array.from(new Array(currentYear - initialYear), (_, i) => currentYear - i)
  }
}
