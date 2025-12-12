use Sponsored;

create table elections(
election_id int auto_increment primary key,
election_name varchar(100) not null,
election_start_date date not null,
election_end_date date not null,
description text,
created_at timestamp default current_timestamp
);