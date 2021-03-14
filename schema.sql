DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL(50,4) NOT NULL,
    department_id INT(10) NOT NULL,
    FOREIGN KEY (department_id)
        REFERENCES departments(id),
    
    PRIMARY KEY (id)
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    role_id INT(10) NOT NULL,
    FOREIGN KEY (role_id)
        REFERENCES roles(id),
    manager_id INT(10) NULL,

    
    PRIMARY KEY (id)
);
SELECT * FROM departments