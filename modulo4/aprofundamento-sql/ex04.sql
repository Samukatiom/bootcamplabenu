-- ex 04
-- A
ALTER TABLE
  Projects
ADD
  description VARCHAR(255) NULL;

-- B
UPDATE
  Projects
SET
  description = "Projeto de sistema em nuvem da Labenu."
WHERE
  id = "001";

UPDATE
  Projects
SET
  description = "Projeto de sistema de gerenciamento de músicas da Labenu."
WHERE
  id = "002";

UPDATE
  Projects
SET
  description = "Projeto de rede de comunicação da Labenu."
WHERE
  id = "003";