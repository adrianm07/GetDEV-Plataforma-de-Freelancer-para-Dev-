CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS posts(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(200) NOT NULL,
    resumo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    prazo VARCHAR(100),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP,
    preco_minimo INT NOT NULL,
    preco_maximo INT NOT NULL,
    tecnologias TEXT,
    status VARCHAR(20) DEFAULT 'DISPONIVEL',
    nota INT,
    comentario TEXT,
    contratante_id UUID REFERENCES users(id) NOT NULL,
    desenvolvedor_id UUID REFERENCES users(id)
    );