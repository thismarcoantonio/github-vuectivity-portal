function normalizeEvent(currentEvents = {}, event) {
  const eventTypes = {
    Fork: "fork",
    Push: "push",
    Watch: "star",
    Gollum: "wiki",
    Issues: "issues",
    PullRequest: "pullRequest",
    IssueComment: "issueComments"
  }
  const selectedType = eventTypes[event.type.replace(/Event/, "")]
  const currentEvent = currentEvents[selectedType] || {}

  if (!selectedType) return currentEvents

  return {
    ...currentEvents,
    [selectedType]: {
      quantity: (currentEvent.quantity || 0) + 1,
      createdAt: new Date(event.created_at),
      repositories: [
        ...(currentEvent.repositories || []),
        ...(!currentEvent.repositories?.includes(event.repository_url) ? [event.repository_url] : [])
      ]
    }
  }
}

export default {
  validYears({ timeline }) {
    const yearsPayload = timeline.map(item => item.created_at)
    const currentYear = new Date().getFullYear()
    const initialYear = yearsPayload.reduce((initialYear, currentDate) => {
      const currentYear = new Date(currentDate).getFullYear()
      return initialYear < currentYear ? initialYear : currentYear
    }, new Date().getFullYear()) - 1

    return Array.from(new Array(currentYear - initialYear), (_, i) => currentYear - i)
  },
  monthTiles({ timeline }) {
    return timeline.reduce((tiles, currentTile) => {
      const currentDate = new Date(currentTile.created_at)
      const currentYear = currentDate.getFullYear()
      const currentMonth = currentDate.getMonth()

      return {
        ...tiles,
        [currentYear]: {
          ...tiles?.[currentYear],
          [currentMonth]: normalizeEvent(tiles[currentYear]?.[currentMonth], currentTile)
        }
      }
    }, {})
  },
  yearTiles({ activeYear, timeline }) {
    const totalWeeksPerYear = 52
    const totalDaysPerWeek = 7

    const currentDate = new Date()

    const activeDate = activeYear === currentDate.getFullYear()
      ? currentDate
      : new Date(activeYear, 11, 31)
    const currentDay = activeDate.getDay() + 1
    const totalTiles = totalWeeksPerYear * totalDaysPerWeek + currentDay

    return Array.from(Array(totalTiles), (_, i) => {
      const actualDate = activeYear === currentDate.getFullYear()
        ? new Date()
        : new Date(activeYear, 11)
      const calculatedDate = actualDate.setDate(activeDate.getDate() - i)
      const actualTiles = timeline.filter(tile => {
        const [tileYear, tileMonth, tileDay] = tile.created_at.split(" ")[0].split("-")
        const tileDate = new Date(tileYear, tileMonth, tileDay, 0).getTime()
        return tileDate === calculatedDate
      })

      return {
        date: new Date(calculatedDate),
        quantity: actualTiles.length
      }
    }).reverse()
  }
}
