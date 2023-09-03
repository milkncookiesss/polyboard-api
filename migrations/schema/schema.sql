CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar,
  "displayname" varchar,
  "email" varchar,
  "password" varchar,
  "userToken" varchar,
  "created_at" timestamp
);

CREATE TABLE "problems" (
  "id" serial PRIMARY KEY,
  "name" varchar,
  "createdByUser" integer,
  "creatorNote" varchar,
  "routePath" varchar,
  "weight" integer,
  "created_at" timestamp,
  "update_at" timestamp
);


ALTER TABLE "problems" ADD FOREIGN KEY ("createdByUser") REFERENCES "users" ("id");
