function createEmployeeRecord(fields) {
    const employee = {
        firstName: fields[0],
        familyName: fields[1],
        title: fields[2],
        payPerHour: fields[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(timeStamp) {
    this.timeInEvents.push({
        type: "TimeIn",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.split(" ")[1])
    })
    return this
}

function createTimeOutEvent(timeStamp) {
    this.timeOutEvents.push({
        type: "TimeOut",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.split(" ")[1])
    })
    return this
}

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date)
    const timeOut = this.timeOutEvents.find(event => event.date === date)
    const hours = (timeOut.hour - timeIn.hour) / 100
    return hours
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(e => e.firstName === firstName)
}

function calculatePayroll(arry){
    return arry.reduce((memo, emp) => {
        return memo + allWagesFor.call(emp)
    }, 0)
}