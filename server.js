    
    const inquirer = require('inquirer');
    const prompts = require('./model/prompts.js');
    const connection = require('./model/connection.js');
    // console.log(connection);
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
    
    ]

    const departmentName= {
        departmentQuestions: {
            type: 'input',
            name: 'deparmentAdd',
            message: 'Wha is the name of the new department?'
        },
    
    
    
    }
    

    async function viewDepartments (){
        connection.query('SELECT * FROM departments', (err, res) => {
          if (err) throw err;
          res.forEach(({ id, name }) => {
            console.log(`${id} | ${name}`);
          });
          console.log('-----------------------------------');
        });
      };

      async function viewRoles(){
        connection.query('SELECT * FROM roles', (err, res) => {
          if (err) throw err;
          res.forEach(({ id, title, salary, department_id}) => {
            console.log(`${id} | ${title}| ${salary} | ${department_id} |`);
          });
          console.log('-----------------------------------');
        });
      };

      async function viewEmployees(){
        connection.query('SELECT * FROM employees', (err, res) => {
          if (err) throw err;
          res.forEach(({ id, first_name, last_name, role_id, manager_id}) => {
            console.log(`${id} | ${first_name}| ${last_name} | ${role_id} | ${manager_id}`);
          });
          console.log('-----------------------------------');
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
            
        async function init(questions) {
        // const answers = await inquirer.prompt(questions);
        const {choice} = await inquirer.prompt({
            type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: options,
        });
        console.log(choice);
        // console.log(questions.deparmentAdd);
        if(choice == options[3]){
            createDepartment();
            // const {deparmentName} = await inquirer.prompt(
            //     {
            //         type: 'input',
            //         name: 'deparmentName',
            //         message: 'Wha is the name of the new department?'
            //     },
               
            // );
            // console.log(deparmentName);
        }
        if(choice == options[0]){
            viewDepartments();
        }
        if(choice == options[1]){
            viewRoles();
        }
        if(choice == options[2]){
            viewEmployees();
        }
        
    }
    init(prompts);

    connection.connect(function(err) {
     
        if(err) throw err;
        console.log("connected as id " + connection.threadId);

    });

    