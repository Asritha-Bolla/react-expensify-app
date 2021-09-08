import moment from 'moment'

// visible expenses

export default (expenses , { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        //if startDate=undefined, all expenses are included
        //if startDate is a number (milliseconds), then expense createdAt is checked. Only expenses created after startDate are included
        const createdAtMoment = moment(expense.createdAt)
        // const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate 
        // const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true 
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    
        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            //if you return 1, b comes first. if you return 1, a comes first
            return a.createdAt < b.createdAt ? 1 : -1 //show the recent expense first
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })
}