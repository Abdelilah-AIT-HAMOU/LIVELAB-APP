CREATE TABLE EMPLOYEES (
    employee_id    NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name     VARCHAR2(50),
    last_name      VARCHAR2(50),
    email          VARCHAR2(255) UNIQUE NOT NULL,
    phone          VARCHAR2(50),
    hire_date      DATE,
    status         VARCHAR2(20),
    department_id   NUMBER,
    current_salary NUMBER(10,2) CHECK (current_salary >= 0)
);

--CREATE INDEX idx_employees_email_ci ON DEV_USER.EMPLOYEES (LOWER(email));

--CREATE INDEX idx_employees_department_id ON DEV_USER.EMPLOYEES (department_id);


-- 1
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('John', 'Doe', 'john.doe@example.com', '123-456-7890', TO_DATE('2020-05-10', 'YYYY-MM-DD'), 'Active', 1, 75000.00);

-- 2
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Jane', 'Smith', 'jane.smith@example.com', '987-654-3210', TO_DATE('2019-08-15', 'YYYY-MM-DD'), 'Active', 1, 82000.00);

-- 3
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Alice', 'Johnson', 'alice.johnson@example.com', '456-789-1234', TO_DATE('2021-01-20', 'YYYY-MM-DD'), 'Inactive', 1, 54000.00);

-- 4
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Bob', 'Williams', 'bob.williams@example.com', '321-654-9870', TO_DATE('2018-07-25', 'YYYY-MM-DD'), 'Active', 2, 90000.00);

-- 5
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Emma', 'Brown', 'emma.brown@example.com', '789-123-4567', TO_DATE('2022-03-10', 'YYYY-MM-DD'), 'Terminated', 2, 62000.00);

-- 6
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Michael', 'Jones', 'michael.jones@example.com', '111-222-3333', TO_DATE('2017-06-05', 'YYYY-MM-DD'), 'Active', 2, 98000.00);

-- 7
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Sophia', 'Martin', 'sophia.martin@example.com', '444-555-6666', TO_DATE('2020-11-11', 'YYYY-MM-DD'), 'Active', 2, 73000.00);

-- 8
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('William', 'Taylor', 'william.taylor@example.com', '777-888-9999', TO_DATE('2016-09-15', 'YYYY-MM-DD'), 'Inactive', 2, 57000.00);

-- 9
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Olivia', 'Anderson', 'olivia.anderson@example.com', '999-111-2222', TO_DATE('2019-04-30', 'YYYY-MM-DD'), 'Active', 2, 89000.00);

-- 10
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('James', 'Thomas', 'james.thomas@example.com', '555-444-3333', TO_DATE('2015-12-01', 'YYYY-MM-DD'), 'Terminated', 2, 50000.00);

-- 11
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Charlotte', 'Moore', 'charlotte.moore@example.com', '666-777-8888', TO_DATE('2023-02-10', 'YYYY-MM-DD'), 'Active', 2, 81000.00);

-- 12
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Benjamin', 'Harris', 'benjamin.harris@example.com', '222-333-4444', TO_DATE('2018-10-20', 'YYYY-MM-DD'), 'Inactive', 2, 74000.00);

-- 13
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Ava', 'Clark', 'ava.clark@example.com', '333-222-1111', TO_DATE('2020-06-15', 'YYYY-MM-DD'), 'Active', 1, 86000.00);

-- 14
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Lucas', 'White', 'lucas.white@example.com', '888-999-0000', TO_DATE('2021-09-05', 'YYYY-MM-DD'), 'Terminated', 1, 59000.00);

-- 15
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Mia', 'Lewis', 'mia.lewis@example.com', '000-111-2222', TO_DATE('2019-07-22', 'YYYY-MM-DD'), 'Active', 3, 67000.00);

-- 16
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Henry', 'Walker', 'henry.walker@example.com', '111-000-9999', TO_DATE('2022-08-14', 'YYYY-MM-DD'), 'Active', 3, 93000.00);

-- 17
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Amelia', 'Hall', 'amelia.hall@example.com', '777-666-5555', TO_DATE('2017-03-11', 'YYYY-MM-DD'), 'Inactive', 3, 72000.00);

-- 18
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Elijah', 'Young', 'elijah.young@example.com', '444-333-2222', TO_DATE('2016-05-09', 'YYYY-MM-DD'), 'Active', 3, 94000.00);

-- 19
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Harper', 'King', 'harper.king@example.com', '555-888-7777', TO_DATE('2018-11-13', 'YYYY-MM-DD'), 'Terminated', 2, 53000.00);

-- 20
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Liam', 'Scott', 'liam.scott@example.com', '444-222-1111', TO_DATE('2020-02-25', 'YYYY-MM-DD'), 'Active', 2, 76000.00);

-- 21
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Olivia', 'Green', 'olivia.green@example.com', '222-444-6666', TO_DATE('2018-10-12', 'YYYY-MM-DD'), 'Active', 2, 80000.00);

-- 22
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Mason', 'Adams', 'mason.adams@example.com', '555-999-1111', TO_DATE('2019-11-29', 'YYYY-MM-DD'), 'Inactive', 2, 60000.00);

-- 23
INSERT INTO EMPLOYEES (first_name, last_name, email, phone, hire_date, status, department_id, current_salary) 
VALUES ('Zoe', 'Baker', 'zoe.baker@example.com', '444-111-5555', TO_DATE('2021-07-03', 'YYYY-MM-DD'), 'Active', 2, 89000.00);