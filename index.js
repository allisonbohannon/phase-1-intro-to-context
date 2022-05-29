// Create employee object from an array of data
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1], 
        title: arr[2], 
        payPerHour: arr[3], 
        timeInEvents: [], 
        timeOutEvents: [],
    }
}; 
//Parse an array to generate an employee object 
function createEmployeeRecords(arr) {
    const recordsArray = arr.map(record => createEmployeeRecord(record))
    console.log(recordsArray); 
    return recordsArray; 
}

function createTimeInEvent(obj, dateStamp) {
    obj.timeInEvents = [...obj.timeInEvents, {
        type: 'TimeIn', 
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0,10),
    }]
    return obj; 
}

function createTimeOutEvent(obj, dateStamp) {
    obj.timeOutEvents = [...obj.timeOutEvents, {
        type: 'TimeOut', 
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0,10),
    }]
    return obj; 
}

function hoursWorkedOnDate(obj, dateStamp) {
   let startEvent = obj.timeInEvents.find(event => event.date === dateStamp)
   let endEvent = obj.timeOutEvents.find(event => event.date === dateStamp)
   return (endEvent.hour - startEvent.hour)/100;   
}

function wagesEarnedOnDate(obj, dateStamp) {
    const hours = hoursWorkedOnDate(obj, dateStamp); 
    return hours * obj.payPerHour; 
}

function allWagesFor(obj) {
   let initialValue = 0; 
   return obj.timeInEvents.reduce(((prevValue, currentValue) => prevValue + wagesEarnedOnDate(obj, currentValue.date)), initialValue )
}

function calculatePayroll(arr) {
    let initialValue = 0; 
    //return arr; 
    return arr.reduce((prevValue, currentValue) => prevValue + allWagesFor(currentValue), initialValue)
}
/*
let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

let sTimeData = [
  ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
  ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
]

let rTimeData = [
  ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
  ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
]

sTimeData.forEach(function (d) {
  let [dIn, dOut] = d
  sRecord = createTimeInEvent(sRecord, dIn)
  sRecord = createTimeOutEvent(sRecord, dOut)
})

rTimeData.forEach(function (d, i) {
  let [dIn, dOut] = d
  rRecord = createTimeInEvent(rRecord, dIn)
  rRecord = createTimeOutEvent(rRecord, dOut)
})

let employees = [sRecord, rRecord]
let grandTotalOwed = employees.reduce((m, e) => m + allWagesFor(e), 0)
console.log(calculatePayroll(employees))
*/
