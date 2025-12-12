use Sponsored;

create table voter_professions(
id int auto_increment primary key,
voter_id int,
profession_id int,
foreign key(voter_id) references voters(voter_id),
foreign key(profession_id) references professions(profession_id)
);