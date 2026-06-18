-- Reutilize este script se a tabela aluno ainda não existir no banco escola.
-- O projeto 05-express-configuracao-estrutura-projetos usa o mesmo esquema.

CREATE TABLE IF NOT EXISTS aluno (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  matricula VARCHAR(255) NOT NULL,
  data_nascimento DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO aluno (nome, email, data_nascimento, matricula)
SELECT 'João da Silva', 'joao.silva@example.com', '1990-01-01', '1234567890'
WHERE NOT EXISTS (SELECT 1 FROM aluno WHERE email = 'joao.silva@example.com');

INSERT INTO aluno (nome, email, data_nascimento, matricula)
SELECT 'Maria Oliveira', 'maria.oliveira@example.com', '1995-02-15', '9876543210'
WHERE NOT EXISTS (SELECT 1 FROM aluno WHERE email = 'maria.oliveira@example.com');
