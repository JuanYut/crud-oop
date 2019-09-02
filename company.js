// * Class EMPLOYE

class Employe {
  constructor(name, area, salary) {
    this._name = name
    this._area = area
    this._salary = salary
  }

  set setName(value) { this._name = value }
  get getName() { return this._name }

  set setArea(value) { this._area = value }
  get getArea() { return this._area }

  set setSalary(value) { this._salary = value }
  get getSalary() { return this._salary }
}

// * Class COMPANY

class Company {
  constructor(name, employes) {
    this._name = name
    this._employes = employes
  }

  set setName(value) { this._name = value }
  get getName() { return this._name }
  
  get getEmployes() { return this._employes }
  set setEmployes(value) { this._employes = value }

  addEmploye(theEmploye) { this._employes.push(theEmploye) }

  removeLastEmploye() { this._employes.pop() }

  paysheetByArea(theArea) {
    let sheet = `*AREA ${theArea}: `
    this._employes.forEach(el => {
      if (el.getArea === theArea) {
        sheet += `${el.getName} - ${el.getSalary}, `
      }
    })
    console.log(sheet)
  }

  paysheet() {
    let sheet = `*ALL : `
    this._employes.forEach(el => {
      sheet += `${el.getName} - ${el.getSalary}, `
    })
    console.log(sheet)
  }

  totalSalary() {
    let total = 0
    this._employes.forEach(el => total += el.getSalary)
    return total
  }

  totalSalaryByArea(theArea) {
    let total = 0
    this._employes.forEach(el => {
      if (el.getArea === theArea) {
        total += el.getSalary
      }
    })
    return total
  }
}

// * Testing the classes:

let em01 = new Employe('Yolanda', 'Programming', 5000)
let em02 = new Employe('Oto', 'Programming', 5000)
let em03 = new Employe('Erik', 'Programming', 5000)
let em04 = new Employe('Juan', 'Lead', 10000)
let em05 = new Employe('Malu', 'Cine', 4000)

let employesList = [em01, em02, em03, em04, em05]
let company01 = new Company('BestCompany', employesList)

// * HTML:

const btnAdd = document.getElementById('btn-add')
const btnRemove = document.getElementById('btn-remove')
const btnShowEmployesArea = document.getElementById('btn-show-employes-area')

const inputName = document.getElementById('input-name')
const inputArea = document.getElementById('input-area')
const inputSalary = document.getElementById('input-salary')

const inputShowArea = document.getElementById('input-show-area')
const btnShowEmployesAll = document.getElementById('btn-show-employes-all')

const btnSalaryTotal = document.getElementById('btn-salary-all')
const btnSalaryArea = document.getElementById('btn-salary-area')

// * TABLE:

const table = document.getElementById('main-table')
const tableTitles = document.getElementById('table-titles')

// * CLEAR CHILD TABLES:

const removeTable = () => {
  while (table.firstChild) {
    console.log(table.firstChild)
    table.removeChild(table.firstChild)
  }
}

const showAll = () => {
  company01.getEmployes.forEach(el => {
    // agregar a la tabla
    const row = table.insertRow(table.lastRow)
    row.insertCell(0).textContent = el.getName
    row.insertCell(1).textContent = el.getArea
    row.insertCell(2).textContent = el.getSalary
  })
}
showAll()

// * BTN ADD:

btnAdd.addEventListener('click', () => {
  if (inputName.value !== '' && inputArea.value !== '' && inputSalary.value !== '') {
    let newEmploye = new Employe(inputName.value, inputArea.value, inputSalary.value)
    company01.addEmploye(newEmploye)
    // agregar a la tabla
    const row = table.insertRow(table.lastRow)
    row.insertCell(0).textContent = newEmploye.getName
    row.insertCell(1).textContent = newEmploye.getArea
    row.insertCell(2).textContent = newEmploye.getSalary
  }
})

// * BTN REMOVE LAST EMPLOYE:

btnRemove.addEventListener('click', () => {
  company01.removeLastEmploye()
  removeTable()
  showAll()
})

// * BTN SHOW BY AREA:

btnShowEmployesArea.addEventListener('click', () => {
  if (inputShowArea.value !== '') {
    removeTable()
    company01.getEmployes.forEach(el => {
      // agregar a la tabla por Area
      if (inputShowArea.value === el.getArea) {
        const row = table.insertRow(table.lastRow)
        row.insertCell(0).textContent = el.getName
        row.insertCell(1).textContent = el.getArea
        row.insertCell(2).textContent = el.getSalary
      }
   })
  }
})

// * BTN SHOW ALL:

btnShowEmployesAll.addEventListener('click', () => {
  removeTable()
  showAll()
})

// * BTN SALARY TOTAL

btnSalaryTotal.addEventListener('click', () => alert(`TOTAL SALARY: ${company01.totalSalary()}`))

// * BTN SALARY BY AREA

btnSalaryArea.addEventListener('click', () => {
  if (inputShowArea.value !== '') 
    alert(`SALARY BY THE AREA ${inputShowArea.value}: ${company01.totalSalaryByArea(inputShowArea.value)}`)
})