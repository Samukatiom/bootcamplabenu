use
  `aragon-samuel-araujo`;

set
  SQL_SAFE_UPDATES = 0;

-- Letra A
SELECT
  *
FROM
  Employees;

-- Letra B
SELECT
  id AS identifier,
  name
FROM
  Employees;

-- Letra C
SELECT
  *
FROM
  Employees
WHERE
  id = 003;

-- Letra D
SELECT
  *
FROM
  Employees
WHERE
  name LIKE "%a%";

-- Letra E
SELECT
  *
FROM
  Employees
WHERE
  name NOT LIKE "%r%"
  AND email LIKE "%u%";