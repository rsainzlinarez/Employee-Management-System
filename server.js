    
    const inquirer = require('inquirer');
    const prompts = require('./model/prompts.js');
    const connection = require('./model/connection.js');
    // console.log(connection);
    const mysql = require('mysql');

    const options =  [
        'Vide Department',
        'View Role',
        'View Employee',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Return to Main Menu',
    
    ]
   


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

    //   async function createProduct () {
    //     console.log('Inserting a new product...\n');
    //     const query = connection.query(
    //       'INSERT INTO products SET ?',
    //       {
    //         flavor: 'Rocky Road',
    //         price: 3.0,
    //         quantity: 50,
    //       },
    //       (err, res) => {
    //         if (err) throw err;
    //         console.log(`${res.affectedRows} product inserted!\n`);
    //         // Call updateProduct AFTER the INSERT completes
    //         updateProduct();
    //       }
    //     );
      
    //     // logs the actual query being run
    //     console.log(query.sql);
    //   };


    
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
            const {deparmentName} = await inquirer.prompt(
                {
                    type: 'input',
                    name: 'deparmentName',
                    message: 'Wha is the name of the new department?'
                },
            );
            console.log(deparmentName);
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

    