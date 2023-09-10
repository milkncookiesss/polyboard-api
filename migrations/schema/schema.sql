CREATE SCHEMA public;
CREATE SCHEMA users;
CREATE SCHEMA problems;

CREATE TABLE public.SequelizeMeta (
    name character varying(255) NOT NULL
);

CREATE TABLE users.users (
  id character varying(255) PRIMARY KEY,
  username varchar unique,
  displayname varchar,
  email varchar unique,
  password varchar,
  user_token varchar,
  created_at timestamp,
  updated_at timestamp
);

CREATE TABLE problems.problems (
  id character varying(255) PRIMARY KEY,
  name varchar,
  created_by character varying(255),
  creator_note varchar,
  route text[],
  weight varchar,
  created_at timestamp,
  updated_at timestamp
);
