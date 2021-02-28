const inqurier = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');
const { allowedNodeEnvironmentFlags } = require('process');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeedb'
});

connection.connect(function (err){
    if(err) throw err;
    console.log("connected id: " + connection.threadId);
});

function userQuestions(){
    inqurier.prompt([
        {
           message: "What would you like to do?",
           type: 'list',
           name: 'choices',
           choices: [
               "veiw employees",
               "veiw departments",
               "add employee",
               "add department",
               "add role",
               "update employee role",
               "quit"
            ]
        }
    ]).then(answer => {
        console.log(answer.choices);
        switch(answer.choices) {
            case 'view emplayees':
                veiwEmployees()
                break;

            case 'veiw deparments':
                veiwDepartments()
                break;
            case 'add employee':
                addEmployee()
                break;
            case 'add department':
                addDepartment()
                break;
            case 'add role':
                addRole()
                break;
            case 'update employee role':
                addEmployeeRole()
                break;
            case 'quit':
                connection.end()
                break;
        }
    })
}

veiwEmployees = () => {
    connection.query('SELECT * FROM employee', function (err, data) {
        console.table(data);
        userQuestions();
    })
}

veiwDepartments = () => {
    connection.query('SELECT * FROM department', function (err, data) {
        console.table(data);
        userQuestions();
    })
}

addEmployee = () => {
    inqurier.prompt([
        {
        type: 'input',
        name: 'firstName', 
        message: "What is the employee's first name?"
    },
    {
        type: 'input',
        name: 'lastName',
        message: "What is they employee's last name?",
    },
    {
        type: 'number',
        name: 'idNum',
        message: "What is the employee's ID number?"
    },
    {
        type: 'input',
        name: 'employeeManger',
        message: "Who is the employee manager?"
    }
]).then(function(res) {
    connection.query(`INSERT INTO * employee (firstName, lastName, roleId, manager_name)`, function(err, res){
        if(err) throw err;
        console.log(res)
        connection.end
    })
})
};

addDepartment = () => {
    inqurier.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: "what is the department called?"
        }
    ]).then(function(res) {
        connection.query(`INSERT INTO * department (departmentName)`, function(err, res){
            if(err) throw err;
            console.log(res)
            connection.end
        })
    })
}

addRole = () => {
    inqurier.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: "Enter new role:"
        },
        {
            type: 'number',
            name: 'salary',
            message: "Wat is the salary?"
        },
        {
            type: 'number',
            name: 'departmentId',
            message: "What is the department the employee is in?"
        }
    ]).then(function(res) {
        connection.query(`INSERT INTO * roles (roleTitle, salary, deparmentID)`, function(err, res){
            if(err) throw err;
            console.log(res)
            connection.end
        })
    })
}

addEmployeeRole = () => {
    inqurier.prompt([
        {
            type: 'input',
            name: 'input',
            message: "Which employee is being updated? (First Name)"
        },
        {
            type: 'number',
            name: 'updatedId',
            message: "enter the employee's new ID"
        }
    ]).then(function (response){
        connection.query("UPDATE employee SET roleID WHERE fistName", [response.roleId, response.firstName], function (err, data){
            console.table(data);
        })
        userQuestions();
    })
}