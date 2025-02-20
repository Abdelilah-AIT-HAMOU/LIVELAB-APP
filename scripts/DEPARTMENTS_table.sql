
CREATE TABLE DEV_USER.DEPARTMENTS (
    department_id   NUMBER PRIMARY KEY,               -- Department ID (Primary Key)
    department_name VARCHAR2(100) NOT NULL,           -- Department Name (Not Null)
    description     VARCHAR2(255),                    -- Description (Optional)
    manager_id      NUMBER,                           -- Manager ID (can reference an employee_id)
    location        VARCHAR2(100),                    -- Location (Optional)
    CONSTRAINT fk_manager FOREIGN KEY (manager_id)   -- Foreign Key Constraint
        REFERENCES DEV_USER.EMPLOYEES(employee_id)   -- Refers to employee_id in EMPLOYEES table
);

