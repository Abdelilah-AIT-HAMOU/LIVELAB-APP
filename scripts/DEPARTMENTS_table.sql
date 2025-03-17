CREATE TABLE DEPARTMENTS (
    department_id   NUMBER PRIMARY KEY,
    department_name VARCHAR2(100) NOT NULL,
    description     VARCHAR2(255),
    location        VARCHAR2(100),
    manager_id      NUMBER
);


INSERT INTO DEPARTMENTS (department_id, department_name, description,  location)
VALUES (1, 'HR', 'Responsible for managing employee relations, benefits, and recruitment.',  'New York');

INSERT INTO DEPARTMENTS (department_id, department_name, description,  location)
VALUES (2, 'IT', 'Responsible for the development of products and technical solutions.',  'Chicago');

INSERT INTO DEPARTMENTS (department_id, department_name, description,  location)
VALUES (3, 'Sales', 'Oversees customer acquisition, product sales, and client relationships.', 'Los Angeles');
