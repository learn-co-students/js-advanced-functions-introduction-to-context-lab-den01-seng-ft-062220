function createEmployeeRecord(array) {
  const employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };

  return employee;
}

function createEmployeeRecords(employees) {
  return employees.map(createEmployeeRecord);
}

function createPunch(type) {
  return function(punch) {
    const [date, hour] = punch.split(' ');

    const $punch = {
      type: type,
      date: date,
      hour: +hour
    };

    return $punch;
  };
}

function createTimeInEvent(employee, punch) {
  const $punch = createPunch('TimeIn')(punch);
  employee.timeInEvents.push($punch);
  return employee;
}

function createTimeOutEvent(employee, punch) {
  const $punch = createPunch('TimeOut')(punch);
  employee.timeOutEvents.push($punch);
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const punchIn = findPunch(employee)(date)('timeInEvents');
  const punchOut = findPunch(employee)(date)('timeOutEvents');

  return (punchOut.hour - punchIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  return employee.payPerHour * hoursWorkedOnDate(employee, date);
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce( (sum, punch) => {
    return sum + wagesEarnedOnDate(employee, punch.date);
  }, 0);
}

function calculatePayroll(employees) {
  return employees.reduce( (payroll, employee) => {
    return payroll + allWagesFor(employee);
  }, 0);
}

function findEmployeeByFirstName(employees, firstName) {
  return employees.find( (employee) => {
    return employee.firstName === firstName;
  });
}

function findPunch(employee) {
  return function(date) {
    return function(type) {
      return employee[type].find( (e) => {
        return e.date === date;
      });
    };
  };
}

