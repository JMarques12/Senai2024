-- exclui um banco de dados se existir (DEV)
drop database if exist lojinha;
create database lojinha;
use lojinha;

-- criar uma tabela de Clientes 
create table Clientes(
    id integer primary key not null auto_increment,
    cpf integer (20) not null,
    nome varchar(50) not null,
    sobrenome varchar(50) not null,
    nascimento date not null
);

-- ver estrutura da tabela
describe Clientes;

-- ver todas as tabelas 
show tables;

-- excluir uma tabela 
drop table Clientes;

-- ver todas as tabelas
show tables;