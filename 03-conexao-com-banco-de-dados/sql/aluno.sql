CREATE TABLE aluno (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  data_nascimento DATE NOT NULL,
  matricula VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO aluno (nome, email, data_nascimento, matricula) VALUES ('João da Silva', 'joao.silva@example.com', '1990-01-01', '1234567890');
INSERT INTO aluno (nome, email, data_nascimento, matricula) VALUES ('Maria Oliveira', 'maria.oliveira@example.com', '1995-02-15', '9876543210');
INSERT INTO aluno (nome, email, data_nascimento, matricula) VALUES ('Pedro Santos', 'pedro.santos@example.com', '1992-03-20', '5678901234');
INSERT INTO aluno (nome, email, data_nascimento, matricula) VALUES ('Ana Costa', 'ana.costa@example.com', '1998-04-10', '4321098765');
INSERT INTO aluno (nome, email, data_nascimento, matricula) VALUES ('Carlos Ferreira', 'carlos.ferreira@example.com', '1993-05-15', '8765432109');
INSERT INTO aluno (nome, email, data_nascimento, matricula) VALUES ('Luiza Oliveira', 'luiza.oliveira@example.com', '1994-06-20', '3456789012');
INSERT INTO aluno (nome, email, data_nascimento, matricula) VALUES ('Rafael Santos', 'rafael.santos@example.com', '1991-07-25', '2345678901');
INSERT INTO aluno (nome, email, data_nascimento, matricula) VALUES ('Camila Costa', 'camila.costa@example.com', '1997-08-30', '1234567890');
INSERT INTO aluno (nome, email, data_nascimento, matricula) VALUES ('Fernando Ferreira', 'fernando.ferreira@example.com', '1992-09-05', '9876543210');


