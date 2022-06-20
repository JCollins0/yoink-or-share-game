-- initial schema


-- drop table users
drop table if exists USERS;

-- these are users who create accounts and can create sessions
CREATE TABLE USERS (
	USER_SID 	integer  PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	USER_NAME	varchar(20) UNIQUE,
	PASSWD		varchar(20),
  	SECRET_TOKEN UUID NOT NULL DEFAULT gen_random_uuid(),
	CRT_TS		date default NOW(),
	CHG_TS		date default NOW()
);

-- drop table resource
drop table if exists RESOURCES;

-- create resources table. This table holds different types of resources in the system
CREATE TABLE RESOURCES (
	RESOURCE_SID	integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	RESOURCE_NAME varchar(20) UNIQUE NOT NULL,
	CRT_TS		date default NOW()
);

-- drop table ACTIONS
drop table if exists ACTIONS;

-- create actions table. This table holds different actions that roles can perform
CREATE TABLE ACTIONS (
	ACTION_SID	integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	ACTION_NAME varchar(20) UNIQUE NOT NULL,
	CRT_TS		date default NOW()
);

-- drop table role permissions
drop table if exists ROLES;

-- create role table. This table holds different types of roles available
CREATE TABLE ROLES (
	ROLE_SID	integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	ROLE_NAME   varchar(20) UNIQUE NOT NULL,
	CRT_TS		date default NOW()
);

-- drop table role permissions
drop table if exists ROLE_PERMISSIONS;

-- create role permissions table. This table holds different types of permissions that roles have
CREATE TABLE ROLE_PERMISSIONS (
	ROLE_PERMISSION_SID	integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	ROLE_SID	integer,
	RESOURCE_SID integer,
	ACTION_SID integer,
	CRT_TS		date default NOW(),

	CONSTRAINT fk_role_id
      FOREIGN KEY(ROLE_SID) 
	  REFERENCES ROLES(ROLE_SID),

	CONSTRAINT fk_resource_id
      FOREIGN KEY(RESOURCE_SID) 
	  REFERENCES RESOURCES(RESOURCE_SID),

	CONSTRAINT fk_action_id
      FOREIGN KEY(ACTION_SID)
	  REFERENCES ACTIONS(ACTION_SID)
);

-- drop table user roles
drop table if exists USER_ROLES;

-- create user roles table. This table holds different types of roles that users can have
CREATE TABLE USER_ROLES (
	USER_ROLE_SID	integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	USER_SID integer,
	ROLE_SID integer,
	CRT_TS		date default NOW(),

	CONSTRAINT fk_user_id
      FOREIGN KEY(USER_SID) 
	  REFERENCES USERS(USER_SID),	  
	
	CONSTRAINT fk_role_id
      FOREIGN KEY(ROLE_SID) 
	  REFERENCES ROLES(ROLE_SID)
);


/*
Permissions Setup

USER 
  -> (1, "John Smith", ...)

RESOURCE 
  -> (1, R1)
  -> (2, R1)

ACTION 
  -> (1, A1)
  -> (2, A2)

ROLE_PERMISSIONS
  -> (1, 1, 1, 1)  -- (sid, ROLE, RESOURCE, ACTION) -- (sid, User, R1, A1)

ROLE
  -> (1, User)
  -> (2, Admin)

-- Entries will be created / removed from this table to add / remove roles
USER_ROLES
  -> (1, 1, 1)  -- (sid,USER, ROLE) -- (sid, "John Smith", User)

*/

