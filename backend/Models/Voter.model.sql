use Sponsored;

create table voters(
voter_id int auto_increment primary key,
full_name varchar(100) not null,
head_of_family varchar(100),
mobile_no varchar(15),
dob date,
age int,
caste_id int,
prabhag_no int,
house_no varchar(20),
user_id int,
deceased boolean default 0,
created_at timestamp default current_timestamp,
foreign key(caste_id) references castes(caste_id),
foreign key(user_id) references users(user_id)
);