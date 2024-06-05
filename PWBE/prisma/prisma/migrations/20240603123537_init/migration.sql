-- CreateTable
CREATE TABLE "Destino" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "data" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PontoTuristico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "id_destino" INTEGER NOT NULL,
    CONSTRAINT "PontoTuristico_id_destino_fkey" FOREIGN KEY ("id_destino") REFERENCES "Destino" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "avaliacao" REAL NOT NULL,
    "email" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "id_destino" INTEGER NOT NULL,
    CONSTRAINT "Hotel_id_destino_fkey" FOREIGN KEY ("id_destino") REFERENCES "Destino" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
