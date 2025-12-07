use Sponsored;

create table voter_committees(
id int auto_increment primary key,
voter_id int,
committee_id int,
foreign key(voter_id) references voters(voter_id),
foreign key(committee_id) references committees(committee_id)
);