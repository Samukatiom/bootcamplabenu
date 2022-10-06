  -- ex 05
  -- A
  SELECT *
  FROM Projects
  ORDER BY dueDate DESC;
  
  -- B
  SELECT name, dueDate
  FROM Projects
  ORDER BY dueDate ASC
  LIMIT 2;