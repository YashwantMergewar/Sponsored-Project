use Sponsored;

create table festivals(
festival_id int auto_increment primary key,
festival_name varchar(100) not null,
festival_date date,
religion varchar(50),
message_text varchar(255),
created_at timestamp default current_timestamp
);