DROP DATABASE IF EXISTS employe_trackerDB
CREATE DATABASE employe_trackerDB

USE employe_trackerDB

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL(1000,4) NOT NULL,
    deparment_id INT(10) NOT NULL,
    
    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    role_id INT(10) NOT NULL,
    manager_id INT(10) NOT NULL,

    
    PRIMARY KEY (id)
);
SELECT * FROM deparment