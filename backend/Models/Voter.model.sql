use Sponsored;

create table voters(
voter_id int auto_increment primary key,
fullname varchar(100) not null,
email varchar(100) not null unique,
head_of_family varchar(100) not null,
mobile_no varchar(10) not null,
aadhar_no varchar(12) not null unique,
dob date not null,
age int not null,
religion enum('Hindu' , 'Muslim' , 'Christian' , 'Sikh' , 'Buddhist' , 'Jain' , 'Other') default 'Hindu',
caste varchar(100) not null,
category enum('General' , 'OBC' , 'SC' , 'ST' , 'EWS', 'VJNT') default 'General',
prabhag_no int,
house_no varchar(20),
created_at timestamp default current_timestamp,
);