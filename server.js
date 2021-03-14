    
const inquirer = require('inquirer');
const prompts = require('./model/prompts.js');
const connection = require('./model/connection.js');
const mysql = require('mysql');

const options =  [
    'View Department',
    'View Role',
    'View Employee',
    'Add Department',
    'Add Role',
    'Add Employee',
    'Update Employee Role',
    'Return to Main Menu',
    'Exit',
]

const departmentName= {
    departmentQuestions: {
    type: 'input',
    name: 'deparmentAdd',
    message: 'Wha is the name of the new department?'
    },
}

//Function select data from departmantes table 
async function viewDepartments (){
    connection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        res.forEach(({ id, name }) => {
            console.log(`${id}     |       ${name}          |`);
        });
        console.log('________________________________________');
    });
};
//Function select data from roles table 
async function viewRoles(){
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        res.forEach(({ id, title, salary, department_id}) => {
            console.log(`${id}   | ${title}|     ${salary}  | ${department_id}  |`);
          });
          console.log('________________________________________');
        });
      };
//Function select data from employees table
async function viewEmployees(){
    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        res.forEach(({ id, first_name, last_name, role_id, manager_id}) => {
            console.log(`${id} | ${first_name}| ${last_name} | ${role_id} | ${manager_id}`);
        });
            console.log('_______________________________________');
    });
};

//function adds a new department to the departments database
async function createDepartment () {
    const departmentName = await inquirer.prompt(
        {
            type: 'input',
            name: 'departmentName',
            message: 'Wha is the name of the new departments ?'
        },
    )
    .then((answer) => {
        connection.query(
            'INSERT INTO departments SET ?',
            {
            name: answer.departmentName
            },
            (err) => {
                if (err) throw err;
                console.log('A new department has been created successfully!');
                init();
            }
        );
    });
};
    
// Function creates a new role
async function createRole () {
    const roleName = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Wha is the name of the role?'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Wha is the annual salary?'
        },
        {
            type: 'number',
            name: 'deptId',
            message: 'What is the department ID?'
        },
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO roles SET ?',
            {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.deptId
            },
            (err) => {
                if (err) throw err;
                console.log('A new department has been created successfully!');
                init();
            }
        );
    });
};

// Function creates a new employee
async function createEmployee () {
    const roleName = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Wha is the employees first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Wha is the employees last name?'
        },
        {
            type: 'number',
            name: 'role_id',
            message: 'What is the employees role ID?'
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'What is the employees manager ID?'
        },
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO employees SET ?',
                {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id
                },
            (err) => {
                if (err) throw err;
                console.log('A new department has been created successfully!');
                init();
            }
        );
    });
};

// Function updates employee roles
async function updateEmployeeRole () {
    connection.query('SELECT * FROM employees', (err, results) => {
        const roleName =  inquirer.prompt([
            {
            name: 'choice',
            type: 'rawlist',
            choices() {
                const choiceArray = [];
                results.forEach(({ first_name }) => {
                    choiceArray.push(first_name);
                });
                return choiceArray;
                },
                message: 'What employee has changed role?',
            },
            {
            name:'role',
            type:'input',
            message:'What is the new role ID?'
            }
        ])
        .then((answer) => {
            let chosenItem;
                results.forEach((item) => {
                    if(item.first_name === answer.choice){
                        chosenItem = item;
                    }
                    console.log(chosenItem);

                });
            connection.query(
                'UPDATE employees SET ? WHERE ?',
                [
                    {
                    role_id: answer.role,
                    },
                    {
                    id: chosenItem.id,
                        },
                    (err) => {
                        if (err) throw err;
                        console.log('A new department has been created successfully!');
                            init();
                    },
                ],
            );

        });
    }); 
};

async function init(questions) {
    const {choice} = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: options,
    }); 
    if(choice == options[0]){
        viewDepartments();
        setTimeout(function afterTwoSeconds() {
            init();
        }, 100)   
    }
    if(choice == options[1]){
        viewRoles();
        setTimeout(function afterTwoSeconds() {
            init();
        }, 100)
    }
    if(choice == options[2]){
        viewEmployees();
        setTimeout(function afterTwoSeconds() {
            init();
        }, 100)
    }
    if(choice == options[3]){       
        async function departmentDataWait(){
            createDepartment();
        }
            departmentDataWait();
    }
    if(choice == options[4]){
        async function roleDataWait(){
            createRole();
        }
            roleDataWait();
        }
    if(choice == options[5]){
        async function employeeDataWait(){
            createEmployee();
        }
            employeeDataWait()
        }
    if(choice == options[6]){
            updateEmployeeRole();
            setTimeout(function afterTwoSeconds() {
                init();
            }, 100)
                    }
    if(choice == options[7]){
        init();
    }
        if(choice == options[8]){
           console.log('goodbye');
         }
}
init(prompts);

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
});

    