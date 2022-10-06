-- ex 03
-- A
ALTER TABLE
  Projects DROP COLUMN title;

DESCRIBE
  Projects;

-- B
ALTER TABLE
  Projects CHANGE date dueDate DATE NOT NULL;

DESCRIBE
  Projects;

-- C
ALTER TABLE
  Employees MODIFY email VARCHAR(255) NOT NULL UNIQUE;

DESCRIBE
  Employees;