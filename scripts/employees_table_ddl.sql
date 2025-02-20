CREATE TABLE DEV_USER.EMPLOYEES (
    employee_id    NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name     VARCHAR2(50),
    last_name      VARCHAR2(50),
    email          VARCHAR2(255) UNIQUE NOT NULL,
    phone          VARCHAR2(50),
    hire_date      DATE,
    status         VARCHAR2(20),
    department_id   NUMBER NULL,
    current_salary NUMBER(10,2) CHECK (current_salary >= 0)
);

--CREATE INDEX idx_employees_email_ci ON DEV_USER.EMPLOYEES (LOWER(email));

--CREATE INDEX idx_employees_department_id ON DEV_USER.EMPLOYEES (department_id);

exit;