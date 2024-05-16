-- CreateTable
CREATE TABLE destinos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    valor REAL NOT NULL,
    data DATE NOT NULL
);

CREATE TABLE pontos_turisticos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    endereco TEXT NOT NULL,
    telefone TEXT NOT NULL,
    valor REAL NOT NULL
);

CREATE TABLE hoteis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    valor REAL NOT NULL,
    avaliacao REAL NOT NULL,
    email TEXT NOT NULL,
    site TEXT NOT NULL
);
