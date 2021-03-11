INSERT INTO department (name)
VALUES 
('Sale'),
('Marketing'),
('Finance'),
('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Manager', 100000, 1),
('Marketing Manager', 102000,2),
('Financial Analyst', 110000,3),
('Engineer', 115000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Donald', 'Duck', 1),
('Daisy', 'Duck',2),
('William', 'Smith', 3,1),
('Peter', 'Pan', 4),
    