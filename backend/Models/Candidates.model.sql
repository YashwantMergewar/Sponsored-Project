use Sponsored;

create table candidates(
candidate_id int auto_increment primary key,
voter_id int not null unique,
election_id int not null unique,
committee_id int,
foreign key(voter_id) references voters(voter_id) on delete cascade,
foreign key(election_id) references elections(election_id) on delete cascade,
foreign key(committee_id) references committees(committee_id) on delete cascade
);
