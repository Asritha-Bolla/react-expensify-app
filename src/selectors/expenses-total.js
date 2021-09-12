export default (expenses) => {
    if (expenses.length !== 0) {
        const amountsArray = expenses.map((expense) => expense.amount)
        return amountsArray.reduce((sum, value) => sum + value , 0) //0 is the starting value which is added to array's 1st element
    } else {
        return 0
    }
}