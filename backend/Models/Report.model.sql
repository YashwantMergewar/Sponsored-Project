use Sponsored;

create table reports(
report_id int auto_increment primary key,
voter_id int,
report_details text,
reported_by varchar(100),
created_at timestamp default current_timestamp,
foreign key(voter_id) references voters(voter_id)
);