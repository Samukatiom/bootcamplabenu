const data = new Date()
const currentYear = data.getFullYear()
const currentDay = String(data.getDate()).padStart(2, '0')
const currentMonth = String(data.getMonth() + 1).padStart(2, '0')

export const currentDate: string = `${currentDay}/${currentMonth}/${currentYear}` 