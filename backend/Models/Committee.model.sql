use Sponsored;

create table committees(
committee_id int auto_increment primary key,
committee_name varchar(100) not null,
type enum('Bhakt Mandal' , 'Temple' , 'Business Group' , 'Social Commitee' , 'Other') default 'other',
created_at timestamp default current_timestamp
);
