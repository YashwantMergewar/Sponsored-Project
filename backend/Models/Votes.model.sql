use Sponsored;

create table votes(
vote_id int auto_increment primary key,
voter_id int not null unique,
candidate_id int not null,
election_id int not null unique,
vote_time timestamp default current_timestamp,
foreign key(voter_id) references voters(voter_id) on delete cascade,
foreign key(candidate_id) references candidates(candidate_id) on delete cascade,
foreign key(election_id) references elections(election_id) on delete cascade
);

