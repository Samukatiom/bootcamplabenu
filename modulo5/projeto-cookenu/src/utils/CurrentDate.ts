export class CurrentDate {
    private currentDate = new Date()

    private currentYear = this.currentDate.getFullYear()
    private currentDay = String(this.currentDate.getDate()).padStart(2, "0")
    private currentMonth = String(this.currentDate.getMonth() + 1).padStart(2, "0")

    public date = `${this.currentYear}/${this.currentMonth}/${this.currentDay}`
}