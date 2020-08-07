// Your code here
const createEmployeeRecord = (array) => {
  const employeeRecord = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employeeRecord;
}

const createEmployeeRecords = (arrayOfArrays) => {
  return arrayOfArrays.map(function(array){
    return createEmployeeRecord(array)
  })
}

const createTimeInEvent = (employeeRecordObject, dateStamp) => {
  const newRecordObject = {
    type: "TimeIn",
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0]
  }
  employeeRecordObject.timeInEvents.push(newRecordObject);
  return employeeRecordObject;
}

const createTimeOutEvent = (employeeRecordObject, dateStamp) => {
  const newRecordObject = {
    type: "TimeOut",
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0]
  }
  employeeRecordObject.timeOutEvents.push(newRecordObject);
  return employeeRecordObject;
}

const hoursWorkedOnDate = (employeeRecordObject, date) => {
  const timeInObject = employeeRecordObject.timeInEvents.find(element => element.date == date);
  const timeOutObject = employeeRecordObject.timeOutEvents.find(element => element.date == date);
  return (timeOutObject.hour - timeInObject.hour) / 100;
}

const wagesEarnedOnDate = (employeeRecordObject, date) => {
  return hoursWorkedOnDate(employeeRecordObject, date) * employeeRecordObject.payPerHour
} 

const allWagesFor = (employeeRecordObject) => {
  const datesArray = employeeRecordObject.timeInEvents.map(eventObject => eventObject.date)
  return datesArray.reduce(function(employee, date){
    return employee + wagesEarnedOnDate(employeeRecordObject, date)
  }, 0)
}

const findEmployeeByFirstName = (srcArray, firstName) => {
  return srcArray.find(employee => employee.firstName == firstName)
}

const calculatePayroll = (array) => {
  return array.reduce(function(wage, employee){
    return wage + allWagesFor(employee)
  }, 0)
}