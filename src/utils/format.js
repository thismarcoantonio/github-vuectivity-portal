export function formatShortMonth(date, options = {}) {
  return Intl.DateTimeFormat("en-us", {
    month: options.isShort ? "short" : "long"
  }).format(date)
}

export function formatDate(date) {
  const receivedDate = new Date(date)
  const shortMonth = formatShortMonth(receivedDate, { isShort: true })
  return `${shortMonth} ${receivedDate.getDate()}, ${receivedDate.getFullYear()}`
}
