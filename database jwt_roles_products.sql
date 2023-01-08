create database jwt_roles_productos;
use jwt_roles_productos;

create table roles(
	id int primary key auto_increment,
    name varchar(255)
);
create table users(
	id int primary key auto_increment,
    username varchar(255),
    email varchar(255) unique,
    password varchar(255),
    roles_id int,
    foreign key(roles_id) references roles(id)
);

create table products(
	id int primary key auto_increment,
    name varchar(255),
    category varchar(255),
    price varchar(255),
    imgUrl varchar(1024)
);

