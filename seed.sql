INSERT INTO departments (name)
VALUES 
('Engineering'),
('Sale'),
('Finance'),
('Marketing');


INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Manager', 100000, 2),
('Marketing Manager', 102000,4),
('Financial Analyst', 110000,3),
('Engineer', 115000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Donald', 'Duck', 1, 4),
('Daisy', 'Duck',3,3),
('William', 'Smith', 4,2),
('Peter', 'Pan', 4,2);
    