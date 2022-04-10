drop table if exists users;


-- these are users who create accounts and can create sessions
CREATE TABLE users (
	user_id 	integer  PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	user_name	varchar(20) UNIQUE,
	passwd		varchar(20),
  	secret_token UUID NOT NULL DEFAULT gen_random_uuid(),
	crt_ts		date default NOW()
);