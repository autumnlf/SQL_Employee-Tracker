const inquirer = require("inquirer");
//const db = require("./db");
require("console.table");

//creating connnection to mysql
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "autumnlf12",
  database: "employeeTracker"
});

connection.connect(function (err) {
  if (err) throw err;
 console.log('Welcome to the SQL Employee Tracker:');

 //if the sql connection is made, then the main prompt will begin
 mainMenu();
});


//The main menu prompt given to user
const mainMenu = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'list',
      message: 'What would you like to do?',
      choices: ['View All Departments',
      'View All Roles',
      'View All Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee Role',
      'Quit']
    }
  ])
  //switches depending on which chosen list item
  .then((res) => {
    console.log(res.list);
    switch (res.list){
      case 'View All Departments':
        viewDepartments();
        break;
      case 'View All Roles':
        viewRoles();
        break;
      case 'View All Employees':
        viewEmployees();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Add an Employee':
        addEmployee();
        break;
      case 'Update an Employee Role':
        updateRole();
        break;
      case 'Quit':
        console.log('Now exiting the SQL Employee Tracker.');
        process.exit();
    }
  })
}


function viewDepartments(){
  connection.query(`SELECT * FROM department;`, (err, res) => {
    console.log('');
    console.table(res);

    mainMenu();
  });
}

function viewRoles(){
  connection.query(`SELECT * FROM role;`, (err, res) => {
    console.log('');
    console.table(res);

    mainMenu();
  });
}

function viewEmployees(){
  connection.query(`SELECT * FROM employee;`, (err, res) => {
    console.log('');
    console.table(res);

    mainMenu();
  });
}
  

function addDepartment(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the department name?'
    }
  ])
  .then((res) => {
    connection.query(`INSERT INTO department (name) VALUES ('${res.departmentName}');`, (err, res) => {
      console.log('');
      console.log(`Successfully added new department!`);
      viewDepartments();
    })
  })
}

function addRole(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'roleName',
      message: 'What is the new role title?'
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'What is the new role salary?'
    },
    {
      type: 'input',
      name: 'roleDepartment',
      message: 'What is the new role department ID number?'
    }
  ])
  .then((res) => {
    connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${res.roleName}', '${res.roleSalary}', '${res.roleDepartment}');`, (err, res) => {
      console.log('');
      console.log(`Successfully added new role!`);
      viewRoles();
    })
  })
}

function addEmployee(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeFirst',
      message: 'What is the first name of the employee?'
    },
    {
      type: 'input',
      name: 'employeeLast',
      message: 'What is the last name of the employee?'
    },
    {
      type: 'input',
      name: 'employeeRole',
      message: 'What is the role ID of the employee?'
    },
    {
      type: 'input',
      name: 'employeeManager',
      message: "What is the manager ID number of the employee's manager? (leave blank if the employee is a manager)"
    }
  ])
  .then((res) => {
    connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${res.employeeFirst}', '${res.employeeLast}', '${res.employeeRole}', '${res.employeeManager}');`, (err, res) => {
      console.log('');
      console.log(`Successfully added new employee!`);
      viewEmployees();
    })
  })
}

function updateRole(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'currentEmployee',
      message: 'What is the ID number of the employee you wish to update?'
    },
    {
      type: 'input',
      name: 'newRole',
      message: 'What is the new role of the employee?'
    }
  ])  
  .then((res) => {
    connection.query(`UPDATE employee SET role_id = ${res.newRole} WHERE id = ${res.currentEmployee};`, (err, res) => {
      console.log('');
      console.log(`Successfully added new employee!`);
      viewEmployees();
    })
  })
}


