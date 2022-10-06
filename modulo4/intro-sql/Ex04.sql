use
  `aragon-samuel-araujo`;

set
  SQL_SAFE_UPDATES = 0;

-- Criando um usuário
INSERT INTO
  `Employees`
VALUES
  ("004", "Yuzo", "yuzo@lbn.com");

DELETE FROM
  Employees
WHERE
  id = 004;

SELECT
  *
FROM
  Employees;