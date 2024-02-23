drop database if exists banco;
create database banco;
use banco;

-- DDL
create table Clientes(
    cpf varchar(20) not null primary key,
    nome varchar(100) not null,
    nascimento Date not null,
    enderecoCep varchar(10) not null,
    enderecoNumero varchar(6),
    enderecoComplemento varchar(50)
);

create table Telefones(
    id int not null primary key auto_increment,
    cpf varchar(20) not null,
    tipo varchar(20) not null,
    telefone varchar(20) not null,
    foreign key (cpf) references Clientes(cpf)
    on delete cascade on update cascade
);

create table Contas(
    nConta int not null primary key auto_increment,
    cpf varchar(20) not null,
    tipo varchar(20) not null,
    foreign key (cpf) references Clientes(cpf)
);