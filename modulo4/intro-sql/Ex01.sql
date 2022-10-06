use
  `aragon-samuel-araujo`;

set
  SQL_SAFE_UPDATES = 0;

CREATE TABLE
  `Employees` (
    id VARCHAR(25) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
  );