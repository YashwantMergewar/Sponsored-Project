create database Sponsored;
use Sponsored;

create table users(
user_id int auto_increment primary key,
username varchar(100) not null,
password_hash varchar(100) not null unique,
email varchar(100) not null unique,
role enum('admin' , 'user') not null,
refreshToken text,
createdAt timestamp default current_timestamp
);

 
