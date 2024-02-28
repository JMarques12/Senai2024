drop database if exists transportadora;
create database transportadora;
use transportadora;
create table Clientes(
    id integer primary key auto_increment,
    nome varchar(50) not null unique,
    endereco float(100,3) not null,
    telefone varchar(20) not null,
    email varchar(50) not null.
);

create table funcionarios(
    id integer primary key auto_increment,
    nome varchar(50) not null unique,
    cargo varchar(30) not null,
    salario float(50,2) not null,
    
);


create table veiculos(
    id integer primary key auto_increment,
    placa varchar(50) not null unique,
    modelo varchar(10) not null,
    capacidade float(10,2) not null,
    
);

create table rotas(
    id integer primary key auto_increment,
    origem varchar(50) not null unique,
    destino varchar(50) not null,
    distancia float(10,2) not null,
    
);

create table entregas(
    id integer primary key auto_increment,
    inicio varchar(50) not null unique,
    fim varchar(50) not null,
    status varchar(10) not null,
    id_rota foreign key (reference id rota),
    id_veiculo foreign key (reference id veiculos),
    id_motorista foreign key (reference id funcionario),
);

create table pedidos(
    id integer primary key auto_increment,
    data pedido date not null,
    valor varchar(50) not null,
    id_cliente foreign key (reference id clientes),
    id_entrega foreign key (reference id entregas),
);

-- DML - Popular com dados de teste
insert into Clientes( sobrenome, nascimento)
values
("","Jair","Silva","1980-01-01"),
("111.111.111-11","Jair","Silva","1980-01-01"),
("111.111.111-11","Jair","Silva","1980-01-01"),

select * from Clientes;