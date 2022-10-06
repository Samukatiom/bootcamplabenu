use
  `aragon-samuel-araujo`;

set
  SQL_SAFE_UPDATES = 0;

-- ex 01
CREATE TABLE
  `Projects` (
    id VARCHAR(25) PRIMARY KEY,
    -- project identifier represented by a number in string format of length fifteen, being a primary key
    name VARCHAR(255) NOT NULL UNIQUE,
    -- project name, which must have a unique value and cannot be null
    title VARCHAR(255) NOT NULL,
    -- project title, cannot be a null value
    date DATE NOT NULL -- project due date, cannot be a null value
  );