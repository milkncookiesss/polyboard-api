CREATE SCHEMA public;
CREATE SCHEMA users;
CREATE SCHEMA problems;

CREATE TABLE public.SequelizeMeta (
    name character varying(255) NOT NULL
);

CREATE TABLE users.users (
  id character varying(255) PRIMARY KEY,
  username varchar,
  displayname varchar,
  email varchar,
  password varchar,
  user_token varchar,
  created_at timestamp,
  updated_at timestamp
);

CREATE TABLE problems.problems (
  id serial PRIMARY KEY,
  name varchar,
  userId integer,
  creatorNote varchar,
  routePath varchar,
  weight integer,
  created_at timestamp,
  updated_at timestamp
);
