function createEmployeeRecord([string1, string2, string3, number]) {
    const obj = {
        firstName: string1,
        familyName: string2,
        title: string3,
        payPerHour: number,
        timeInEvents: [],
        timeOutEvents: [],
    }
    return obj;
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(object, dateValue) {
    let hourTime = parseInt(dateValue.substring(11, 15));
    let dateTime = dateValue.substring(0,10)
    let timeObj = {
        type: 'TimeIn',
        hour: hourTime,
        date: dateTime
    }
    object['timeInEvents'].push(timeObj)
    return object;
}

function createTimeOutEvent(object, dateValue) {
    let hourTime = parseInt(dateValue.substring(11, 15));
    let dateTime = dateValue.substring(0,10)
    let timeObj = {
        type: 'TimeOut',
        hour: hourTime,
        date: dateTime
    }
    object['timeOutEvents'].push(timeObj)
    return object;
}

function hoursWorkedOnDate(object, dateValue) {
    const timeIn = object.timeInEvents.find((timeObj) => timeObj.date === dateValue).hour;
    const timeOut = object.timeOutEvents.find((timeObj) => timeObj.date === dateValue).hour;
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(object, dateValue) {
    const wage = object.payPerHour;
    const hoursWorked = hoursWorkedOnDate(object, dateValue);
    return (hoursWorked * wage)
}

function allWagesFor(object) {
    const allWages = object.timeInEvents.map((timeObj) => {
        return wagesEarnedOnDate(object, timeObj.date)
    })
    return allWages.reduce((accumulation, wage) => accumulation + wage)
}

function calculatePayroll(array) {
    const payrollTotal = (array.map((employee) => allWagesFor(employee)))
    return payrollTotal.reduce((accumulation, wage) => accumulation + wage)
}