export function formatDate(date) {
  const receivedDate = new Date(date)
  const shortMonth = Intl.DateTimeFormat("default", { month: "short" }).format(receivedDate)
  return `${shortMonth} ${receivedDate.getDate()}, ${receivedDate.getFullYear()}`
}
