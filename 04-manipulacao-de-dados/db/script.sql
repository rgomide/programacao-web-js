create table aluno (
    id serial primary key,
    nome varchar(255) not null,
    email varchar(255) not null,
    data_nascimento date not null
);

create table endereco (
    id serial primary key,
    id_aluno integer not null references aluno(id) on delete cascade,
    rua varchar(255) not null,
    numero integer not null,
    cidade varchar(255) not null,
    estado varchar(255) not null
);

create table curso (
    id serial primary key,
    nome varchar(255) not null,
    descricao text not null,
    carga_horaria integer not null
);

create table matricula (
    id_aluno integer not null references aluno(id) on delete cascade,
    id_curso integer not null references curso(id) on delete cascade,
    data_matricula date not null,
    constraint pk_matricula primary key (id_aluno, id_curso)
);

-- Inserção de alunos
INSERT INTO aluno (nome, email, data_nascimento) VALUES
('João Silva', 'joao.silva@email.com', '1995-05-15'),
('Maria Oliveira', 'maria.oliveira@email.com', '1998-10-22'),
('Pedro Santos', 'pedro.santos@email.com', '1997-03-08'),
('Ana Souza', 'ana.souza@email.com', '1999-12-03'),
('Lucas Ferreira', 'lucas.ferreira@email.com', '1996-07-30');

-- Inserção de cursos
INSERT INTO curso (nome, descricao, carga_horaria) VALUES
('Desenvolvimento Web', 'Curso completo de desenvolvimento web com HTML, CSS e JavaScript', 120),
('Banco de Dados', 'Fundamentos de banco de dados relacionais e SQL', 80),
('Programação em Python', 'Introdução à programação utilizando a linguagem Python', 100);

-- Inserção de endereços
INSERT INTO endereco (id_aluno, rua, numero, cidade, estado) VALUES
(1, 'Rua das Flores', 123, 'São Paulo', 'SP'),
(2, 'Avenida Brasil', 456, 'Rio de Janeiro', 'RJ'),
(3, 'Rua dos Pinheiros', 789, 'Curitiba', 'PR'),
(4, 'Avenida Paulista', 1010, 'São Paulo', 'SP');

-- Inserção de matrículas
INSERT INTO matricula (id_aluno, id_curso, data_matricula) VALUES
(1, 1, '2023-02-10'),
(1, 2, '2023-02-15'),
(2, 1, '2023-01-20'),
(3, 3, '2023-03-05'),
(4, 2, '2023-02-25'),
(5, 1, '2023-02-01'),
(5, 3, '2023-03-10');