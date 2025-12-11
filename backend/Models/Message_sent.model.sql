use Sponsored;

create table messages_sent(
msg_id int auto_increment primary key,
voter_id int,
festival_id int,
sent_at timestamp default current_timestamp,
status enum('Sent' , 'Pending' , 'Failed') default 'Sent',
foreign key(voter_id) references voters(voter_id),
foreign key(festival_id) references festivals(festival_id)
);

