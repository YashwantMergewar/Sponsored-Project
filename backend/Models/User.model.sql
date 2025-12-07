create database Sponsored;
use Sponsored;

create table users(
user_id int auto_increment primary key,
username varchar(100) not null,
password_hash varchar(100) not null unique,
email varchar(100) not null unique,
role enum('admin' , 'user') not null,
voter_id int null,
foreign key(voter_id) references voter(voter_id) on delete set null
);

 
